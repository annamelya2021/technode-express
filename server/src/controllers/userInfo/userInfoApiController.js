import userInfoController from "./userInfoController.js";

/**
 * @module controllers/userInfo/userInfoApiController
 */

/**
 * Asynchronously retrieves all users based on an optional query.
 *
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object to send the JSON response.
 * @return {Promise<void>} JSON response with the list of users.
 */
const getAll = async (req, res) => {
    const query = req.query.query;
    try {
        const { error, data } = await userInfoController.getAll(query);
        if (error) {
            return res.status(500).json({ error });
        }
        res.json({ data });
    } catch (err) {
        console.error("Error retrieving all users:", err);
        res.status(500).json({ error: "Error retrieving all users." });
    }
};

/**
 * Asynchronously retrieves a user by ID.
 *
 * @param {Object} req - The request object containing the user ID in params.
 * @param {Object} res - The response object to send the JSON response.
 * @return {Promise<void>} JSON response with the user data.
 */
const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const { error, data } = await userInfoController.getById(id);
        if (error) {
            return res.status(404).json({ error });
        }
        res.json({ data });
    } catch (err) {
        console.error("Error retrieving user by ID:", err);
        res.status(500).json({ error: "Error retrieving user by ID." });
    }
};

/**
 * Asynchronously creates a new user with the provided data.
 *
 * @param {Object} req - The request object containing the user data in the body.
 * @param {Object} res - The response object to send the JSON response.
 * @return {Promise<void>} JSON response with the created user data.
 */
const create = async (req, res) => {
    try {
        const { error, data } = await userInfoController.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        res.status(201).json({ data });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Error creating user." });
    }
};

/**
 * Asynchronously updates a user with the provided data.
 *
 * @param {Object} req - The request object containing the user ID in params and user data in the body.
 * @param {Object} res - The response object to send the JSON response.
 * @return {Promise<void>} JSON response with the updated user data.
 */
const update = async (req, res) => {
    const id = req.params.id;
    try {
        const { error, data } = await userInfoController.update(id, req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        res.json({ data });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Error updating user." });
    }
};

/**
 * Asynchronously removes a user based on the ID provided.
 *
 * @param {Object} req - The request object containing the user ID in params.
 * @param {Object} res - The response object to send the JSON response.
 * @return {Promise<void>} JSON response with the removed user data.
 */
const remove = async (req, res) => {
    const id = req.params.id;
    try {
        const { error, data } = await userInfoController.remove(id);
        if (error) {
            return res.status(404).json({ error });
        }
        res.json({ data });
    } catch (err) {
        console.error("Error removing user:", err);
        res.status(500).json({ error: "Error removing user." });
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
};
