import cartController from "../../controllers/cart/cartController.js";
import cartModel from "../../models/cartModel.js";
import { productModel } from "../../models/productModel.js";
// import productModel from "../../models/productModel.js";

// async function addProductToCart (req, res) {
//     const userId = req.user._id;
//     const productId = req.params.productId;
    
//     const cart = await cartController.createCart(userId);
  
//     // console.log('cart :>> ', cart);
//         const product = await productModel.findById(productId);
//         if(!product){
//             res.status(409).json({error:"Product not found"})
//         }
        
//     cart.cartProducts.push(product);
//     await cart.save();
//     res.json(cart);
// }


async function addProductToCart(req, res) {
    const userId = req.user._id;
    const productId = req.params.productId;

    const cart = await cartController.createCart(userId);

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        cart.cartProducts.push({
            product: product,
            quantity: 1 
        });

        await cart.save();
        return res.json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}





// async function closeCart (req, res) {
//     const cartId = req.params.cartId;
//     const userId = req.user._id;
//     const cart = await cartController.closeCart(cartId,userId);
//     if(!cart || cart.error){
//         const errorCode = cart?.errorCode || 500;
//         const errorMessage = cart?.error || "Error closing cart";
//         res.status(errorCode).json({error:errorMessage})
//     }
//     res.json(cart);
// }

// async function getCartOpened (req, res) {
//     const userId = req.user._id;
//     const cart = await cartController.getCartOpened(userId);
//     if(!cart || cart.error){
//         const errorCode = cart?.errorCode || 500;
//         const errorMessage = cart?.error || "Error getting opened carts";
//         res.status(errorCode).json({error:errorMessage})
//     }
//     res.json(cart);
// }

// async function getCarts (req, res) {
//     const userId = req.user._id;
//     const carts = await cartController.getCarts(userId);
//     if(!carts || carts.error){
//         const errorCode = carts?.errorCode || 500;
//         const errorMessage = carts?.error || "Error getting closed carts";
//         res.status(errorCode).json({error:errorMessage})
//     }
//     res.json(carts);
// }

// async function addProductToCart (req, res) {
//     const productId = req.params.productId;
//     const userId = req.user._id;
//     const cart = await cartController.addProductToCart(productId, userId);
//     if(!cart || cart.error){
//         const errorCode = cart?.errorCode || 500;
//         const errorMessage = cart?.error || "Error adding product to cart";
//         res.status(errorCode).json({error:errorMessage})
//     }
//     res.json(cart);
// }

// async function removeProductFromCart (req, res) {
//     const productId = req.params.productId;
//     const userId = req.user._id;
//     const cart = await cartController.removeProductFromCart(productId, userId);
//     if(!cart || cart.error){
//         const errorCode = cart?.errorCode || 500;
//         const errorMessage = cart?.error || "Error removing product from cart";
//         res.status(errorCode).json({error:errorMessage})
//     }
//     res.json(cart);
// }

export default {
    // closeCart,
    // getCartOpened,
    // getCarts,
    addProductToCart,
    // removeProductFromCart
};
