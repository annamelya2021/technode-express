import userInfoModel from "../../models/userInfoModel.js";
import express from "express";

const router = express.Router();

/**
 * @module controllers/userInfo/userInfoController
 */

/**
 * Asynchronously retrieves all users and sends a JSON response with the list of users.
 *
 * @return {Promise<Object>} JSON response with the list of users.
 */
async function getAll() {
    try {
        const users = await userInfoModel.find({});
        return { data: users };
    } catch (error) {
        console.error(error);
        return { error };
    }
}

/**
 * Asynchronously retrieves a user by ID.
 *
 * @param {string} id - The ID of the user to retrieve.
 * @return {Promise<Object>} An object containing the user data or an error object.
 */
async function getById(id) {
    try {
        const user = await userInfoModel.findById(id);
        if (!user) {
            return { error: "El usuario no existe" };
        }
        return { data: user };
    } catch (error) {
        console.error(error);
        return { error };
    }
}

/**
 * Asynchronously creates a user with the provided data.
 *
 * @param {Object} userData - The data for the new user.
 * @return {Promise<Object>} An object containing the created user or an error object.
 */
async function create(userData) {
    try {
        const newUser = await userInfoModel.create(userData);
        return { data: newUser };
    } catch (error) {
        console.error(error);
        return { error };
    }
}

/**
 * Updates a user with the provided data.
 *
 * @param {string} id - The ID of the user to update.
 * @param {Object} userData - The data for the user update.
 * @return {Promise<Object>} An object containing the updated user data or an error object.
 */
async function update(id, userData) {
    try {
        const updatedUser = await userInfoModel.findByIdAndUpdate(id, userData, { new: true });
        if (!updatedUser) {
            return { error: "El usuario no se pudo actualizar" };
        }
        return { data: updatedUser };
    } catch (error) {
        console.error(error);
        return { error };
    }
}

/**
 * Asynchronously removes a user based on the ID provided.
 *
 * @param {string} id - The ID of the user to remove.
 * @return {Promise<Object>} An object containing the removed user data or an error object.
 */
async function remove(id) {
    try {
        const deletedUser = await userInfoModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return { error: "El usuario no se pudo eliminar" };
        }
        return { data: deletedUser };
    } catch (error) {
        console.error(error);
        return { error };
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    remove,
}
