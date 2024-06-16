import cartController from "../../controllers/cart/cartController.js";
import cartModel from "../../models/cartModel.js";
import { productModel } from "../../models/productModel.js";
// import productModel from "../../models/productModel.js";

async function getCartData (req, res) {
    const userId = req.user._id;
   
    const cart = await cartController.getCart(userId);
  
    if(cart.length===0 ){
      return  res.json({message:"Cart is ampty"} );
    }
    
    res.json(cart);
}


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



async function updateQuantity (req, res) {
    const productId = req.params.productId;
    const userId = req.user._id;
    const quantity =  req.body.quantity;
    const cart = await cartController.updateQuantityController(userId, productId, quantity);
   
    res.json(cart);
}

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
    getCartData,
    updateQuantity
    // removeProductFromCart
};
