import mongoose from "mongoose";
import { productSchema } from "./productModel.js";
export const cartProductSchema = new mongoose.Schema({
    product:productSchema,
    quantity: {
        type: Number,
        min: 1
    },
});
export const cartSchema  = new mongoose.Schema({
    cartProducts: [cartProductSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
   // calcular total price fuera
})



const cartModel = mongoose.model("carts",cartSchema);

export default cartModel;