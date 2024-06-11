import productModel from "../../models/productModel.js";
import express from "express";

// Crear un router para manejar las rutas
const router = express.Router();
/**
 * @module controllers/product/productControllers
 */

/**
 * Asynchronously retrieves all products and sends a JSON response with the list of products.
 *
 * @return {Promise<Object>} JSON response with the list of products.
 */
async function getAll() {
    try {
        const products = await productModel.find({});
        return { data: products };
    } catch (error) {
        console.error(error);
        return { error };
    }
}
/**
 * Asynchronously retrieves a product by ID.
 *
 * @param {string} id - The ID of the product to retrieve.
 * @return {Promise<Object>} An object containing the product data or an error object.
 */
async function getById(id) {
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return { error: "El producto no existe" };
        }
        return { data: product };
    } catch (error) {
        console.error(error);
        return { error };
    }
}
/**
 * Asynchronously creates a product with the provided data.
 *
 * @param {Object} productData - The data for the new product.
 * @return {Promise<Object>} An object containing the created product or an error object.
 */
async function create(productData) {
    try {
        const newProduct = await productModel.create(productData);
        return { data: newProduct };
    } catch (error) {
        console.error(error);
        return { error };
    }
}
/**
 * Updates a product with the provided data.
 *
 * @param {string} id - The ID of the product to update.
 * @param {Object} productData - The data for the product update.
 * @return {Promise<Object>} An object containing the updated product data or an error object.
 */
async function update(id, productData) {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, productData, { new: true });
        if (!updatedProduct) {
            return { error: "El producto no se pudo actualizar" };
        }
        return { data: updatedProduct };
    } catch (error) {
        console.error(error);
        return { error };
    }
}
/**
 * Asynchronously removes a product based on the ID provided.
 *
 * @param {string} id - The ID of the product to remove.
 * @return {Promise<Object>} An object containing the removed product data or an error object.
 */
async function remove(id) {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return { error: "El producto no se pudo eliminar" };
        }
        return { data: deletedProduct };
    } catch (error) {
        console.error(error);
        return { error };
    }
}
// Obtener todos los productos
router.get("/products", async (req, res) => {
    const result = await getAll();
    if (result.error) {
        return res.status(500).json(result);
    }
    return res.status(200).json(result);
});

// Obtener un producto por ID
router.get("/products/:id", async (req, res) => {
    const result = await getById(req.params.id);
    if (result.error) {
        return res.status(404).json(result);
    }
    return res.status(200).json(result);
});

// Crear un nuevo producto
router.post("/products", async (req, res) => {
    const result = await create(req.body);
    if (result.error) {
        return res.status(400).json(result);
    }
    return res.status(201).json(result);
});

// Actualizar un producto por ID
router.put("/products/:id", async (req, res) => {
    const result = await update(req.params.id, req.body);
    if (result.error) {
        return res.status(400).json(result);
    }
    return res.status(200).json(result);
});

// Eliminar un producto por ID
router.delete("/products/:id", async (req, res) => {
    const result = await remove(req.params.id);
    if (result.error) {
        return res.status(400).json(result);
    }
    return res.status(200).json(result);
});

export default router;
