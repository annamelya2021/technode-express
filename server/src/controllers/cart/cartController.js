import cartModel from "../../models/cartModel";
import productModel from "../../models/productModel";

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
        return {error:"There was an error creating the cart"};
    }
}
//cambiar el booleano isOpened/ enviar correo al usuaurio
async function closeCart(cartId){
    try {
        const cart = await cartModel.findOneAndUpdate({_id:cartId},{isOpened:false})
        return cart
    } catch (error) {
        console.error(error);
        return {error:"There was an error closing the cart"};
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
    return openCarts[0]
    
} catch (error) {
    console.error(error);
        return {error:"There was an error getting the opened cart"};
}
}
//devolver array de carritos
//Historial de carritos
async function getCarts(userId){
    try {
        const cartHistory = await cartModel.find({cartUser: userId, isOpened:false})
        return cartHistory;
    } catch (error) {
        console.error(error);
        return {error:"There was an error getting the cart history"};
    }
}

async function addProductToCart(productId,cartId){
    try {
        const cart = await cartModel.findById(cartId)
        const product = await productModel.findById(productId)
        cart.products.push(product)
        await cart.save()
        return cart
        
    } catch (error) {
        console.error(error);
        return {error:"There was an error adding product to cart"};
    }
}
async function removeProductFromCart(productId,cartId){
    try {
        const cart = await cartModel.findById(cartId)
        const product = await productModel.findById(productId)
        cart.products.pull(product)
        await cart.save()
        return cart
        
    } catch (error) {
        console.error(error);
        return {error:"There was an error removing product from cart"};
    }
}
//utilizar un find para borrar solo el primero que encuentre






export const functions ={
    createCart,
    closeCart,
    getCartOpened,
    getCarts,
    addProductToCart,
    removeProductFromCart

}