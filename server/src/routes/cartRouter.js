import express from "express";
import cartApiController from "../controllers/cart/cartApiController.js";


const router = express.Router();


router.post("/", cartApiController.createCart);
router.get("/opened", cartApiController.getCartOpened);
router.get("/history", cartApiController.getCarts);
router.post("/products/:productId", cartApiController.addProductToCart);
router.delete("/products/:productId", cartApiController.removeProductFromCart);
router.post("/:cartId/close",cartApiController.closeCart)


export default router