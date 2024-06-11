import express from "express";
import cartApiController from "../controllers/cart/cartApiController.js";


const router = express.Router();


router.post("/:userId", cartApiController.createCart);
router.post("/:userId/closed", cartApiController.closeCart);
router.get("/:userId", cartApiController.getCartOpened);
router.get("/:userId/history", cartApiController.getCarts);
router.post("/:userId/products/:productId", cartApiController.addProductToCart);
router.delete("/:userId/products/:productId", cartApiController.removeProductFromCart);


export default router