import cartModel from "../../models/cartModel.js";
import productModel from "../../models/productModel.js";

//crear carrito nuevo para un usuario coprobndo que no tenga ingun carrito abierto
async function createCart(userId) {
  try {
    const existingCart = await cartModel.findOne({
      user: userId,
      isOpened: true,
    });

    if (existingCart) {
      return existingCart;
    }
    const cart = {
      cartUser: userId,
      isOpened: true,
    };
    const newCart = await cartModel.create(cart);
    return newCart;
  } catch (error) {
    console.error(error);
    return { error: "There was an error creating the cart", errorCode: 500 };
  }
}
//cambiar el booleano isOpened/ enviar correo al usuaurio
async function closeCart(cartId, userId) {
  try {
    const existingCart = await cartModel.findById(cartId);
    if (!existingCart || !existingCart.cartUser.equals(userId)) {
      return { error: "Does not exist or not belong to user", errorCode: 400 };
    }
    existingCart.isOpened = false;
    await existingCart.save();
    return existingCart;
  } catch (error) {
    console.error(error);
    return { error: "There was an error closing the cart", errorCode: 500 };
  }
}

function processCart(cart) {
  const processedCart = { ...cart._doc };
  const ids = [];
  const quantity = {};

  cart.cartProducts.forEach((product) => {
    if (!ids.some((id) => id.toString() === product._id.toString())) {
      ids.push(product._id);
      quantity[product._id] = 1;
    } else {
      quantity[product._id]++;
    }
  });
  const uniqueProducts = [];
  ids.forEach((id) => {
    const unique = cart.cartProducts.find(
      (product) => product._id.toString() === id.toString()
    );
    uniqueProducts.push({ ...unique._doc, quantity: quantity[id] });
  });
  processedCart.cartProducts = uniqueProducts;

  return processedCart;
}

//
async function getCartOpened(userId, process = false) {
  try {
    const openCarts = await cartModel.find({
      cartUser: userId,
      isOpened: true,
    });
    if (openCarts.length === 0) {
      const cart = await createCart(userId);
      return cart;
    }
    const cart = openCarts[0];
    if (!process) {
      return cart;
    }
    await cart.populate("cartProducts");
    const processedCart = processCart(cart);
    return processedCart;
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error getting the opened cart",
      errorCode: 500,
    };
  }
}
//devolver array de carritos
//Historial de carritos
async function getCarts(userId) {
  try {
    const cartHistory = await cartModel.find({
      cartUser: userId,
      isOpened: false,
    }); //.populate("cartProducts")
    const carts = await Promise.all(
      cartHistory.map(async (cart) => {
        await cart.populate("cartProducts");
        const processedCart = processCart(cart);
        return processedCart;
      })
    );
    return carts;
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error getting the cart history",
      errorCode: 500,
    };
  }
}

async function addProductToCart(productId, userId) {
  try {
    const cart = await getCartOpened(userId);
    const product = await productModel.findById(productId);
    cart.cartProducts.push(product);
    await cart.save();
    const populatedCart = await cart.populate("cartProducts");
    const processedCart = processCart(populatedCart);
    return processedCart;
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error adding product to cart",
      errorCode: 500,
    };
  }
}
async function removeProductFromCart(productId, userId) {
  try {
    const cart = await getCartOpened(userId);
    const index = cart.cartProducts.findIndex((product) =>
      product.equals(productId)
    );
    if (index !== -1) {
      cart.cartProducts.splice(index, 1);
    }
    if (cart.cartProducts.length === 0) {
      await cartModel.deleteOne();
      return null;
    } else {
      await cart.save();
      const populatedCart = await cart.populate("cartProducts");
      const processedCart = processCart(populatedCart);
      return processedCart;
    }
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error removing product from cart",
      errorCode: 500,
    };
  }
}

export const functions = {
  createCart,
  closeCart,
  getCartOpened,
  getCarts,
  addProductToCart,
  removeProductFromCart,
};

export default functions;
