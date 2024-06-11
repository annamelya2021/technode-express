import productController from './productController.js';

/**
 * @module controllers/product/productApiControllers
 */
/**
 * Asynchronously retrieves all products and sends a JSON response with the list of products.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} JSON response with the list of products.
 */
async function getAll(req, res) {
    const { error, data } = await productController.getAll();
    res.json({ error, data });
}
/**
 * Asynchronously retrieves a product by ID and sends a JSON response with the error and data.
 *
 * @param {Object} req - The request object containing the product ID.
 * @param {Object} res - The response object to send the JSON response.
 * @return {Promise<void>} JSON response with error and data.
 */
async function getById(req, res) {
    const id = req.params.id;
    const { error, data } = await productController.getById(id);
    res.json({ error, data });
}
/**
 * Asynchronously creates a product with the provided data and sends a JSON response with error and data.
 *
 * @param {Object} req - The request object containing the product information.
 * @param {Object} res - The response object to send the JSON response.
 * @return {Promise<void>} JSON response with error and data.
 */
async function create(req, res) {
    const productData = req.body;
    console.log("natxolineras",req.body);
    const { error, data } = await productController.create(productData);
    res.json({ error, data });
}
/**
 * Asynchronously updates a product with the provided data and sends a JSON response with error and data.
 *
 * @param {Object} req - The request object containing the product ID and update information.
 * @param {Object} res - The response object to send the JSON response.
 * @return {Promise<void>} JSON response with error and data.
 */
async function update(req, res) {
    const id = req.params.id;
    const productData = req.body;
    const { error, data } = await productController.update(id, productData);
    res.json({ error, data });
}
/**
 * Asynchronously removes a product based on the ID provided in the request parameters and sends a JSON response with error and data.
 *
 * @param {Object} req - The request object containing the product ID.
 * @param {Object} res - The response object to send the JSON response.
 * @return {Promise<void>} JSON response with error and data.
 */
async function remove(req, res) {
    const id = req.params.id;
    const { error, data } = await productController.remove(id);
    res.json({ error, data });
}
export {
    getAll,
    getById,
    create,
    update,
    remove
}

export default {
    getAll,
    getById,
    create,
    update,
    remove
}
