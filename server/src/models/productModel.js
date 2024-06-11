import mongoose from "mongoose";




const productSchema = new mongoose.Schema({
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
        type: Double, required: true
    },
    product_type: {
        type:String,
        enum : ["mobile","laptop"],
        default: "mobile"
    },
    product_comment: {
        type: String, required: true
    },
    product_amount: {
        type: Number,
        required: true,
      },
    });
    
    
const productModel = mongoose.model("products", productSchema);

export default productModel;