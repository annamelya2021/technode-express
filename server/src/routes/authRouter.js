import {Router} from "express";

import userApiController from "../controllers/users/userApiController.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";


const router  = Router();


router.post("/register",ctrlWrapper(userApiController.register));
router.post("/login",ctrlWrapper(userApiController.login));

export default router;