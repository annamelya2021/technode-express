import React, { useState, useEffect } from 'react';
import { addToFavorites, removeFromFavorites } from '../../utils/local';
import './ProductCard.css';
import ProductDetailModal from './ProductDetailModel';

const ProductCard = ({ product, isLoggedIn, onRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (product) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setIsFavorite(favorites.includes(product._id));
    }
  }, [product]);

  const handleToggleFavorite = () => {
    if (product && isFavorite) {
      removeFromFavorites(product._id);
      if (onRemove) onRemove(product._id);
    } else if (product) {
      addToFavorites(product._id);
    }
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  if (!product) {
    return null; 
  }

  const { product_image, product_name, product_price, product_comments } = product;

  return (
    <div className="product-card">
      <img src={product_image} alt={product_name} className="product-image" />
      <h3>{product_name}</h3>
      <p>Price: ${product_price}</p>
      <p>Comments: {product_comments ? product_comments.length : 0}</p>
      <button onClick={handleCardClick}>View Details</button>
      <button>Add to Cart</button>
      <button>Buy Now</button>
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      {isModalOpen && (
        <ProductDetailModal
          product={product}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
};

export default ProductCard;
