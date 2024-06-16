import React, { useState, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { getProduct } from '../../utils/fetch';
import './FavoriteProducts.css';

const FavoriteProducts = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        console.log('Favorites from localStorage:', favorites);

        const products = await Promise.all(
          favorites.map(async productId => {
            const response = await getProduct(productId);
            return response.data; // assuming the API response structure is { data: { ...productData } }
          })
        );
        console.log('Products fetched:', products);

        setFavoriteProducts(products);
      } catch (error) {
        console.error('Failed to load favorite products:', error);
      }
    };

    fetchFavoriteProducts();
  }, []);

  return (
    <div className="favorite-products">
      <h2>Favorite Products</h2>
      <div className="product-list">
        {favoriteProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FavoriteProducts;
