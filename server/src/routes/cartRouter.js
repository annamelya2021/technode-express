import express from "express";
import cartApiController from "../controllers/cart/cartApiController.js";


const router = express.Router();


router.get("/", cartApiController.getCartData);
router.delete("/", cartApiController.clearCart);
router.post("/:productId", cartApiController.addProductToCart);
router.patch("/:productId", cartApiController.updateQuantity);
router.delete("/:productId", cartApiController.removeProduct);



export default router