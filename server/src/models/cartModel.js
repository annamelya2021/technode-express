import mongoose from "mongoose";

const cartSchema  = new mongoose.Schema({
    cartProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    cartProduct_amount:{
        type: Number,
        required: true
    },
    cartUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    cart_totalPrice:{
        type: Number,
        required: true
    }
})

const cartModel = mongoose.model("carts",cartSchema);

export default cartModel;