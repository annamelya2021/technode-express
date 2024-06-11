import cartController from "../../controllers/cart/cartController.js";

async function createCart (req, res) {
    const userId = req.params.userId;
    const cart = await cartController.createCart(userId);
    res.json(cart);
}

async function getCartOpened (req, res) {
    const userId = req.params.userId;
    const cart = await cartController.getCartOpened(userId);
    res.json(cart);
}

async function getCarts (req, res) {
    const userId = req.params.userId;
    const carts = await cartController.getCarts(userId);
    res.json(carts);
}

async function addProductToCart (req, res) {
    const productId = req.params.productId;
    const cartId = req.params.cartId;
    const cart = await cartController.addProductToCart(productId, cartId);
    res.json(cart);
}

async function removeProductFromCart (req, res) {
    const productId = req.params.productId;
    const cartId = req.params.cartId;
    const cart = await cartController.removeProductFromCart(productId, cartId);
    res.json(cart);
}

export default {
    createCart,
    getCartOpened,
    getCarts,
    addProductToCart,
    removeProductFromCart
};
