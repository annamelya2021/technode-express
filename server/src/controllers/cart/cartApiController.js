import cartController from "../../controllers/cart/cartController.js";
import cartModel from "../../models/cartModel.js";
import { productModel } from "../../models/productModel.js";
// import productModel from "../../models/productModel.js";

async function getCartData (req, res) {
    const userId = req.user._id;
 
    const cart = await cartController.getCart(userId);
    console.log("cart2",cart)

    if(!cart ){
      return  res.json({message:"Cart is ampty"} );
    }
    
    res.json(cart);
}

async function addProductToCart(req, res) {
    const userId = req.user._id;
    const productId = req.params.productId;
    try {
        const cart = await cartController.createCart(userId);
     
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const productIndex = cart.cartProducts.findIndex(item => item.product._id.toString() === productId);

        if (productIndex === -1) {
            cart.cartProducts.push({ product, quantity: 1 });
        } else {
            cart.cartProducts[productIndex].quantity += 1;
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// async function updateQuantity(req, res) {
//     const userId = req.user._id;
//     const productId = req.params.productId;
//     const quantity = req.body.quantity;

//     try {
//         const cart = await cartController.updateQuantityController(userId, productId, quantity);
//         res.json(cart);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// }

export const updateQuantity = async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    try {
        console.log(`Request received: userId=${userId}, productId=${productId}, quantity=${quantity}`);
        const cart = await cartController.updateQuantityController(userId, productId, quantity);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

async function removeProduct(req, res) {
    const userId = req.user._id;
    const productId = req.params.productId;

    try {
        const cart = await cartController.removeProductFromCart(userId, productId);
        res.json(cart);
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: error.message });
    }
}
async function clearCart(req, res) {
    const userId = req.user._id;

    try {
        const cart = await cartController.clearCart(userId);
        res.json(cart);
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ error: error.message });
    }
}
export default {
    addProductToCart,
    getCartData,
    updateQuantity,
    removeProduct,
    clearCart
};
