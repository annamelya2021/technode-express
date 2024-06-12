import cartController from "../../controllers/cart/cartController.js";

async function createCart (req, res) {
    const userId = req.user._id;
    const cart = await cartController.createCart(userId);
    if(!cart || cart.error){
        const errorCode = cart?.errorCode || 500;
        const errorMessage = cart?.error || "Error creating cart";
        res.status(errorCode).json({error:errorMessage})
    }
    res.json(cart);
}

async function closeCart (req, res) {
    const cartId = req.params.cartId;
    const userId = req.user._id;
    const cart = await cartController.closeCart(cartId,userId);
    if(!cart || cart.error){
        const errorCode = cart?.errorCode || 500;
        const errorMessage = cart?.error || "Error closing cart";
        res.status(errorCode).json({error:errorMessage})
    }
    res.json(cart);
}

async function getCartOpened (req, res) {
    const userId = req.user._id;
    const cart = await cartController.getCartOpened(userId);
    if(!cart || cart.error){
        const errorCode = cart?.errorCode || 500;
        const errorMessage = cart?.error || "Error getting opened carts";
        res.status(errorCode).json({error:errorMessage})
    }
    res.json(cart);
}

async function getCarts (req, res) {
    const userId = req.user._id;
    const carts = await cartController.getCarts(userId);
    if(!carts || carts.error){
        const errorCode = carts?.errorCode || 500;
        const errorMessage = carts?.error || "Error getting closed carts";
        res.status(errorCode).json({error:errorMessage})
    }
    res.json(carts);
}

async function addProductToCart (req, res) {
    const productId = req.params.productId;
    const userId = req.user._id;
    const cart = await cartController.addProductToCart(productId, userId);
    if(!cart || cart.error){
        const errorCode = cart?.errorCode || 500;
        const errorMessage = cart?.error || "Error adding product to cart";
        res.status(errorCode).json({error:errorMessage})
    }
    res.json(cart);
}

async function removeProductFromCart (req, res) {
    const productId = req.params.productId;
    const userId = req.user._id;
    const cart = await cartController.removeProductFromCart(productId, userId);
    if(!cart || cart.error){
        const errorCode = cart?.errorCode || 500;
        const errorMessage = cart?.error || "Error removing product from cart";
        res.status(errorCode).json({error:errorMessage})
    }
    res.json(cart);
}

export default {
    createCart,
    closeCart,
    getCartOpened,
    getCarts,
    addProductToCart,
    removeProductFromCart
};
