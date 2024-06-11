import express from "express";
import productApiController from "../controllers/products/productApiController.js";
import commentControllers from "../controllers/comments/apiCommentController.js";


const router = express.Router();

// Definir las rutas y vincularlas con las funciones del controlador de la API
router.get("/", productApiController.getAll);
router.get("/:id", productApiController.getById);
router.post("/", productApiController.create);
router.put("/:id", productApiController.update);
router.delete("/:id", productApiController.remove);
router.post('/:id/comments', commentControllers.createComment);
router.get('/:id/comments', commentControllers.getCommentsByPostId);
router.delete('/:id/comments/:commentId', commentControllers.deleteComment);

export default router;
