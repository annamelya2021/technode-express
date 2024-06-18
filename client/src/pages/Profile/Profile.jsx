import React, { useState, useEffect } from 'react';
import { getProduct } from '../../utils/fetch';
import { removeFromFavorites } from '../../utils/local';
import Product from '../product/Product';
import './Profile.css';

const Profile = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);

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

    const removeFavorite = (productId) => {
        const updatedFavorites = favoriteProducts.filter(product => product._id !== productId);
        setFavoriteProducts(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites.map(product => product._id)));
    };

    return (
        <div className="favorite-products">
            <h2>Favorite Products</h2>
            <div className="product-list">
                {favoriteProducts.length > 0 ? (
                    favoriteProducts.map(product => (
                        <Product key={product._id} product={product} onRemove={() => removeFromFavorites(product._id)} />
                    ))
                ) : (
                    <p>No favorite products found.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;

