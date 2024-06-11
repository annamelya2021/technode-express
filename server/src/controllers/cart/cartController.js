import cartModel from "../../models/cartModel";
import productModel from "../../models/productModel";

const getProducts = async (res,req) =>{
    const products = await productModel.find();

    if(products){
        res.json({products})
    } else {
        res.json( {message : "there are no products"} );
    }

};

const getProductsCart = async (res,req) =>{
    const productsCart = await cartModel.find();

    if(productsCart){
        res.json({productsCart})
    } else {
        res.json( {message : "there are no products in the cart"} );
    }

};
//Tener en cuenta lo que hay dentro del modelo
const addProductCart = async (res,req) =>{
    const  {product_image, product_name, product_description, product_model, product_type, product_price} = req.body;

    const isInProducts = productModel.findOne({product_name});

    const isNotEmpty = product_image!== "" && product_name!== "" && product_description!== "" && product_model!== "" && product_type!== "" && product_price!== "";

    const isInCart = cartModel.findOne({product_name});

    if(!isInProducts){
        res.status(400).json({
            message : "This product is not in our database"
        });
    }
    else if(isNotEmpty && !isInCart){
        const newProductInCart = new Cart({product_image, product_name, product_description, product_model, product_type, product_price})

    }
}

export const functions ={
    getProducts,
    getProductsCart,

}