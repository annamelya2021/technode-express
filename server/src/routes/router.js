import {Router} from "express";
import userRouter from "./userRouter.js";
import { isAuthenticated,isAdmin } from "../middlewares/authMiddleware.js";
import authRouter from "./authRouter.js";


const router  =  Router();
router.use("/",authRouter);
router.use("/users",userRouter);







export default router