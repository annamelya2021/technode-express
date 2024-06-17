import cartModel from "../../models/cartModel.js";
import productModel from "../../models/productModel.js";

async function createCart(userId) {
    try {
        const existingCart = await cartModel.findOne({ userId: userId });
        if (existingCart) {
            return existingCart;
        }

        const newCart = await cartModel.create({ userId: userId });
        return newCart;
    } catch (error) {
        console.error(error);
        return { error: "There was an error creating the cart", errorCode: 500 };
    }
}

// const updateQuantityController = async (userId, productId, quantity) => {
//     const cart = await cartModel.findOne({ userId });

//     if (!cart) {
//         throw new Error('Cart not found');
//     }

//     const productIndex = cart.cartProducts.findIndex(item => item.product._id.toString() === productId);

//     if (productIndex === -1) {
//         throw new Error('Product not found in cart');
//     }

//     cart.cartProducts[productIndex].quantity = quantity;
    

//     await cart.save();
//     return cart;
// };


// cartController.js
export const updateQuantityController = async (userId, productId, quantity) => {
    console.log(`User ID: ${userId}, Product ID: ${productId}, Quantity: ${quantity}`);
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
        throw new Error('Cart not found');
    }

    const productIndex = cart.cartProducts.findIndex(item => item.product._id.toString() === productId);
    if (productIndex === -1) {
        throw new Error('Product not found in cart');
    }

    cart.cartProducts[productIndex].quantity = quantity;
    await cart.save();
    return cart;
};




async function getCart(userId){
    try {
        const cart = await cartModel.find({userId: userId})
     
        return cart[0];
    } catch (error) {
        console.error(error);
        return {error:"There was an error getting the cart history",errorCode:500};
    }
}

async function addProductToCart(productId,userId){
    try {
        const cart = await getCartOpened(userId)
        const product = await productModel.findById(productId)
        cart.products.push(product)
        await cart.save()
        const populatedCart = await cartModel.populate('products');
        return populatedCart;
        
    } catch (error) {
        console.error(error);
        return {error:"There was an error adding product to cart",errorCode:500};
    }
}
async function removeProductFromCart(userId, productId) {
    try {
        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        const productIndex = cart.cartProducts.findIndex(item => item.product._id.toString() === productId);
        if (productIndex === -1) {
            throw new Error('Product not found in cart');
        }

        cart.cartProducts.splice(productIndex, 1);

        await cart.save();
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}



async function clearCart(userId) {
    try {
        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.cartProducts = [];

        await cart.save();
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}


export default  {
   createCart,
   getCart,
   addProductToCart,
   removeProductFromCart,
   updateQuantityController,
   clearCart

}

