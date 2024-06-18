import express from "express";

import { isAdmin } from "../middlewares/authMiddleware.js";
import orderApiController from "../controllers/order/orderApiController.js"


const router = express.Router();

// router.get("/", isAdmin, orderApiController.getOrders);
// router.post("/", orderApiController.sentOrder);



export default router;
