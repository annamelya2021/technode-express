// ProductUtils.js
import { useState, useEffect } from 'react';
import { addProductToCart } from './fetch';
import { addToFavorites, removeFromFavorites } from './local';

export const useProductActions = (product, user) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.includes(product._id));
    }, [product._id]);

    const handleAddToCart = async () => {
        try {
            if (user) {
                const updatedCart = await addProductToCart(product._id);
                console.log('Product added to cart:', updatedCart);
                alert('Product added to cart');
            } else {
                alert('Please register or log in to add to cart.');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleToggleFavorite = () => {
        if (isFavorite) {
            removeFromFavorites(product._id);
        } else {
            addToFavorites(product._id);
            alert('Product added to favorites');
        }
        setIsFavorite(!isFavorite);
    };

    return { isFavorite, handleAddToCart, handleToggleFavorite };
};

export default useProductActions;