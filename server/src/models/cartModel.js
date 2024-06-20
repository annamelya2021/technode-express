import mongoose from "mongoose";

const cartSchema  = new mongoose.Schema({
    cartProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    }],
    cartUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    isOpened: {
        type: Boolean,
        default:true

    }
   // calcular total price fuera
})

const cartModel = mongoose.model("carts",cartSchema);

export default cartModel;