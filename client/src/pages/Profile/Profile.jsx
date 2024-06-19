import { useLoaderData } from 'react-router-dom';
import { getCarts, update, getProduct } from '../../utils/fetch';
import React, { useState, useEffect } from 'react';
import { removeFromFavorites } from '../../utils/local';
import Product from '../product/Product';
import './Profile.css';

const Profile = () => {
    const user = useLoaderData();
    const [carts, setCarts] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

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

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            try {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                console.log('Favorites from localStorage:', favorites);

                const products = await Promise.all(
                    favorites.map(async productId => {
                        const response = await getProduct(productId);
                        return response.data;
                    })
                );
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

    return (
        <>
            {/* User Information */}
            <article className="user-card" key={user._id}>
                <h2>{user.username}</h2>
                <p>{user.lastname}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <button onClick={() => handleUpdateUser(user)}>Edit Profile</button>
            </article>

            {/* User Address */}
            <article>
                <p>{user.user_direction}</p>
            </article>

            {/* Bought Carts History */}
            <article>
                <div><h3>Bought Carts History</h3>
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
                    )}
                </div>
            </article>

            {/* Favorite Products */}
            <div className="favorite-products">
                <h2>Favorite Products</h2>
                <div className="product-list">
                    {favoriteProducts.length > 0 ? (
                        favoriteProducts.map(product => (
                            <Product key={product._id} product={product} onRemove={() => removeFavorite(product._id)} />
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
