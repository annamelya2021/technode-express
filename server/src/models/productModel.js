import mongoose from "mongoose"
export const productSchema = new mongoose.Schema({
    
    product_image:{
        type: String
    },
    product_name: {
        type: String, required: true
    },
    product_description: {
        type: String, required: true
    },
    product_model: {
        type: String, required: true
    },
    product_price: {
        type: Number, required: true
    },
    product_type: {
        type:String,
        enum : ["mobile","laptop"]
    },
    product_comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }],
    product_amount: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true });
    
    
export const productModel = mongoose.model("products", productSchema);


export default {productSchema, productModel};