import cartModel from "../../models/cartModel.js";
import productModel from "../../models/productModel.js";

//crear carrito nuevo para un usuario coprobndo que no tenga ingun carrito abierto
async function createCart(userId){
    try {
        const existingCart = await cartModel.findOne({user:userId, isOpened:true})

        if(existingCart){
            return existingCart
        }
        const cart = {
            user:userId,
            isOpened:true
        }
        const newCart = await cartModel.create(cart)
        return newCart
        
    } catch (error) {
        console.error(error);   
        return {error:"There was an error creating the cart",errorCode:500};
    }
}
//cambiar el booleano isOpened/ enviar correo al usuaurio
async function closeCart(cartId,userId){
    try {
        const existingCart = await cartModel.findById(cartId);
        if(!existingCart || !existingCart.cartUser.equals(userId)){
            return {error:"Does not exist or not belong to user",errorCode:400}
        }
        existingCart.isOpened =false
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
async function getCarts(userId){
    try {
        const cartHistory = await cartModel.find({cartUser: userId, isOpened:false})//.populate("cartProducts")
        const carts = await Promise.all(cartHistory.map(async (cart)=>{
            await cart.populate("cartProducts")
            return cart
        }))
        return carts;
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



export const functions = {
    createCart,
    closeCart,
    getCartOpened,
    getCarts,
    addProductToCart,
    removeProductFromCart

}

export default functions

