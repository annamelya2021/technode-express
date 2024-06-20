import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { getCarts, update, getProduct } from '../../utils/fetch';
import { removeFromFavorites } from '../../utils/local';

import './Profile.css';
import OneProduct from '../../components/product/Product';

const Profile = () => {
    const user = useLoaderData();
    const [carts, setCarts] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    // Fetch bought carts history
    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const userId = user._id;
                const cartsData = await getCarts(userId);
                if (!cartsData.error) {
                    setCarts(cartsData);
                } else {
                    console.log(cartsData.error);
                }
            } catch (error) {
                console.error("Error fetching carts:", error);
            }
        };
        fetchCarts();
    }, [user]);

    // Fetch favorite products
    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            try {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                const products = await Promise.all(
                    favorites.map(async productId => {
                        const response = await getProduct(productId);
                        return response.data;
                    })
                );
                console.log('products :>> ', products);
                setFavoriteProducts(products);
            } catch (error) {
                console.error('Failed to load favorite products:', error);
            }
        };

        fetchFavoriteProducts();
    }, []);

    const handleUpdateUser = async (userData) => {
        const result = await update(userData);
        if (result) {
            alert('User updated successfully!');
        } else {
            alert('Error updating user.');
        }
    };

    const removeFavorite = (productId) => {
        const updatedFavorites = favoriteProducts.filter(product => product._id !== productId);
        setFavoriteProducts(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites.map(product => product._id)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            _id: user._id,
            username: e.target.username.value,
            lastname: e.target.lastname.value,
            phone: e.target.phone.value,
            user_direction: e.target.user_direction.value
        };
        handleUpdateUser(userData);
    };

    return (
        <>
        {user && ( 
            <article className="user-card" key={user._id}>
                <h2>{user.username}</h2>
                <p>{user.lastname}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <Popup 
                    trigger={<button>Update user</button>} 
                    modal 
                    nested
                >
                    {close => (
                        <div className='updateUser-modal'>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username">User Name</label>
                                <input type="text" name="username" defaultValue={user.username} />
                                
                                <label htmlFor="lastname">Last Name</label>
                                <input type="text" name="lastname" defaultValue={user.lastname} />
                                
                                <label htmlFor="phone">Phone</label>
                                <input type="number" name="phone" defaultValue={user.phone} />
                                
                                <label htmlFor="user_direction">Address</label>
                                <input type="text" name="user_direction" defaultValue={user.user_direction} />
                                
                                <button>Update</button>
                            </form>
                        </div>
                    )}
                </Popup>
            </article>
        )}
    

            {/* Bought Carts History */}
            <article>
                <div>
                    <h3>Bought Carts History</h3>
                    {carts.length > 0 ? (
                        carts.map(cart => (
                            <div key={cart._id} className="cart-card">
                                <h4>Cart ID: {cart._id}</h4>
                                <ul>
                                    {cart.cartProducts.map(product => (
                                        <li key={product._id}>
                                            {product.product_name} - ${product.product_price}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No bought carts found.</p>
                        // ggg
                    )}
                </div>
            </article>

            {/* Favorite Products */}
            <div className="favorite-products">
                <h2>Favorite Products</h2>
                <div className="product-list">
                    {favoriteProducts.length > 0 ? (
                        favoriteProducts.map(product => (
                            <div key={product._id} className="product-card">
                                <img src={product.product_image} alt={product.product_name} />
                                <p>{product.product_name}</p>
                                <p>${product.product_price}</p>
                                <p>{product.product_description}</p>
                                <p>{product.product_model}</p> 
                                <button onClick={() => removeFavorite(product._id)}>Remove</button> 

                            </div>
                        ))
                    ) : (
                        <p>No favorite products found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
