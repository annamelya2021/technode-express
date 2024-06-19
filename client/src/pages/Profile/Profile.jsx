import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getCarts, update } from '../../utils/fetch';

const Profile = () => {
    const user= useLoaderData();
    const [carts, setCarts] = useState([]);
    console.log("carts", carts)
//Sacar todos los carritos de getCarts y mostrarlos en cards, pero solo los cerrados
    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const userId = user._id;
                const cartsData = await getCarts(userId);
                if(!cartsData.error){
                    setCarts(cartsData);
                } else{
                    console.log(cartsData.error);
                }
                
            } catch (error) {
                console.error("Error fetching carts:", error);
                
            }
        };
        fetchCarts();
    },[user])

    const handleUpdateUser = async (userData) => {
        const result = await update(userData);
        if (result) {
            alert('User updated successfully!');
        } else {
            alert('Error updating user.');
        }
    };
    return (
        <>
        {/* informacion de usuario */}
        <article className="user-card" key={user._id}>
    
            <h2>{user.username}</h2>
            <p>{user.lastname}</p>
    
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <button onClick={() => handleUpdateUser(user)}>Edit Profile</button>
       
        </article>
        
        {/* informacion dirección */}
        <article>
        <p>{user.user_direction}</p>
    
        </article>
    
        {/* informacion Favoritos y CarritosComprados */}
        <article>
            <div></div>
            <div><h3>Bought Carts History</h3>
                    {carts.map(cart => (
                        <div key={cart._id} className="cart-card">
                            <h4>Cart ID: {cart._id}</h4>
                            <ul>
                                {cart.cartProducts.map(product => (
                                    <li key={product._id}>
                                        {product.product_name}
                                        {product.product_price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}</div>
        </article>
        </>
    );
};
   

export default Profile
