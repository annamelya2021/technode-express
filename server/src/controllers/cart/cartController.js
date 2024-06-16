import cartModel from "../../models/cartModel.js";
import productModel from "../../models/productModel.js";

async function createCart(userId) {
    try {
        const existingCart = await cartModel.findOne({ userId: userId });
        if (existingCart) {
            return existingCart;
        }

        const newCart = await cartModel.create({ userId: userId });
        return newCart;
    } catch (error) {
        console.error(error);
        return { error: "There was an error creating the cart", errorCode: 500 };
    }
}



//cambiar el booleano isOpened/ enviar correo al usuaurio
async function updateQuantityController(userId, productId, quantity){
    try {
        const existingCart = await cartModel.findById(cartId);
        if(!existingCart || !existingCart.cartUser.equals(userId)){
            return {error:"Does not exist or not belong to user",errorCode:400}
        }
        existingCart.updateOne({$pull:{quantity:{product:productId}}});
        await existingCart.save();
        return existingCart;
    } catch (error) {
        console.error(error);
        return {error:"There was an error closing the cart",errorCode:500};
    }
}
//
async function getCartOpened(userId){
    try {
    const openCarts = await cartModel.find({cartUser: userId, isOpened:true})
    if (openCarts.length===0){
        const cart = await createCart(userId);
        return cart
    }
    const cart = openCarts[0];
    await cart.populate("cartProducts")
    return cart
    
} catch (error) {
    console.error(error);
        return {error:"There was an error getting the opened cart",errorCode:500};
}
}
//devolver array de carritos
//Historial de carritos
async function getCart(userId){
    try {
        const cart = await cartModel.find({userId: userId})
     
        return cart[0];
    } catch (error) {
        console.error(error);
        return {error:"There was an error getting the cart history",errorCode:500};
    }
}

async function addProductToCart(productId,userId){
    try {
        const cart = await getCartOpened(userId)
        const product = await productModel.findById(productId)
        cart.products.push(product)
        await cart.save()
        const populatedCart = await cartModel.populate('products');
        return populatedCart;
        
    } catch (error) {
        console.error(error);
        return {error:"There was an error adding product to cart",errorCode:500};
    }
}
async function removeProductFromCart(productId,userId){
    try {
        const cart = await getCartOpened(userId)
        const product = await productModel.findById(productId)
        cart.products = cart.products.filter(product => !product.equals(productId))
        await cart.save()
        const populatedCart = await cart.populate('products');
        return populatedCart;
        
    } catch (error) {
        console.error(error);
        return {error:"There was an error removing product from cart",errorCode:500};
    }
}



export default  {
   createCart,
   closeCart,
   getCartOpened,
   getCart,
   addProductToCart,
   removeProductFromCart,
   updateQuantityController

}

