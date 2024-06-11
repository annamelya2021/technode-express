import {Router} from "express";
// import { isAdmin,isAuthenticated } from "../middlewares/authMiddleware.js";
import userApiController from "../controllers/users/userApiController.js";


const router  = Router();

// router.get("/",userApiController.getAll);
// router.get("/byproperty",userApiController.getByProperty);
// router.get("/bytoken",isAuthenticated,userApiController.getByToken);
// router.get("/:id",userApiController.getById);
// router.post("/",isAdmin,userApiController.create);
// router.put("/:id",isAdmin,userApiController.update);
// router.delete("/:id",isAdmin,userApiController.remove);

router.get("/",userApiController.getAll);
router.get("/byproperty",userApiController.getByProperty);
router.get("/bytoken", userApiController.getByToken);
router.get("/:id",userApiController.getById);
router.post("/",userApiController.create);
router.put("/:id",userApiController.update);
router.delete("/:id",userApiController.remove);

export default router;