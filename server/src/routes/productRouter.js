import express from "express";
import productApiController from "../../controllers/product/productApiController.js";

const router = express.Router();

// Definir las rutas y vincularlas con las funciones del controlador de la API
router.get("/products", productApiController.getAll);
router.get("/products/:id", productApiController.getById);
router.post("/products", productApiController.create);
router.put("/products/:id", productApiController.update);
router.delete("/products/:id", productApiController.remove);

export default router;
