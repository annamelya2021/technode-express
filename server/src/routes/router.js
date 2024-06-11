import {Router} from "express";
import userRouter from "./userRouter.js";
import { isAuthenticated,isAdmin } from "../middlewares/authMiddleware.js";


const router  =  Router();
router.use("/users",userRouter);






export default router