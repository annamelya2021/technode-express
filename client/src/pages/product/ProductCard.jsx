import React, { useState, useEffect, useContext } from 'react';
import { addToFavorites, removeFromFavorites } from '../../utils/local';
import './ProductCard.css';
import ProductDetailModal from './ProductDetailModel';
import { useLoaderData } from 'react-router-dom';
import UserContext from '../../context/userContext';
import { addProductToCart } from '../../utils/fetch';

const ProductCard = ({ product, isLoggedIn, onRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { product_image, product_name, product_price, product_comments } = product;
  const { user } = useContext(UserContext);

  const handleAddToCart = async () => {
      console.log('Product added to cart:', user);
      try {
          if (user) {
              const updatedCart = await addProductToCart(product._id);
              
              alert('Product added to cart');
          } else {
              alert('Please register or log in to add to cart.');
          }
      } catch (error) {
          console.error('Error adding product to cart:', error);
      }
  };

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


  return (
    <div className="product-card">
      <img src={product_image} alt={product_name} className="product-image" />
      <h3>{product_name}</h3>
      <p>Price: ${product_price}</p>
      <p>Comments: {product_comments ? product_comments.length : 0}</p>
      <button onClick={handleCardClick}>View Details</button>
      <button onClick={handleAddToCart}>Add to Cart</button>
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
