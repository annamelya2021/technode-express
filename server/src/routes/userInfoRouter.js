import express from "express";
import userInfoApiController from "../controllers/userInfo/userInfoApiController.js";

const router = express.Router();

// Definir las rutas y vincularlas con las funciones del controlador de usuario
router.get("/", userInfoApiController.getAll);
router.get("/:id", userInfoApiController.getById);
router.post("/", userInfoApiController.create);
router.put("/:id", userInfoApiController.update);
router.delete("/:id", userInfoApiController.remove);

export default router;
