import express from "express";
import productApiController from "../controllers/products/productApiController.js";


const router = express.Router();

// Definir las rutas y vincularlas con las funciones del controlador de la API
router.get("/", productApiController.getAll);
router.get("/:id", productApiController.getById);
router.post("/", productApiController.create);
router.put("/:id", productApiController.update);
router.delete("/:id", productApiController.remove);

export default router;
