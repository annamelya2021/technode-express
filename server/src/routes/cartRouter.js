import express from "express";
import cartApiController from "../controllers/cart/cartApiController.js";


const router = express.Router();


router.post("/:productId", cartApiController.addProductToCart);
router.get("/", cartApiController.getCartData);
router.patch("/:productId", cartApiController.updateQuantity);
// router.post("/products/:productId", cartApiController.addProductToCart);
// router.delete("/products/:productId", cartApiController.removeProductFromCart);
// router.post("/:cartId/close",cartApiController.closeCart)


export default router