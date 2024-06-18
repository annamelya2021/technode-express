import mongoose from "mongoose"
import { cartProductSchema } from "./cartModel.js";
export const orderSchema = new mongoose.Schema({
    
  order: [cartProductSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
},
   userName: {
    type: String,
    required: true
   },
   userTel:{
    type: Number,
    required: true
   },
   userDirection: {
    type: String    
    },
    userComment: {
        type: String    
    },

},
    { timestamps: true });
    
    
export const orderModel = mongoose.model("orders", orderSchema);


export default {orderSchema, orderModel};