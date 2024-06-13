import express from "express";
import productApiController from "../controllers/products/productApiController.js";
import commentControllers from "../controllers/comments/apiCommentController.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Definir las rutas y vincularlas con las funciones del controlador de la API
router.get("/", productApiController.getAll);
router.get("/:id", productApiController.getById);
router.post("/",isAuthenticated,isAdmin, productApiController.create);
router.put("/:id",isAuthenticated,isAdmin, productApiController.update);
router.delete("/:id",isAuthenticated,isAdmin, productApiController.remove);
router.post('/:id/comments', isAuthenticated, commentControllers.createComment);
router.get('/:id/comments', isAuthenticated, commentControllers.getCommentsByPostId);
router.delete('/:id/comments/:commentId', isAuthenticated, isAdmin,commentControllers.deleteComment);

export default router;
