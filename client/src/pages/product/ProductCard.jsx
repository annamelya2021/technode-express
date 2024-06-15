import React, { useState } from 'react';
import './ProductCard.css';
import ProductDetailModal from './ProductDetailModel';
// import ProductDetailModal from './ProductDetailModal.jsx';

const ProductCard = ({ product, isLoggedIn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { product_image, product_name, product_price, product_comments } = product;

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="product-card">
      <img src={product_image} alt={product_name} className="product-image" />
      <h3>{product_name}</h3>
      <p>Price: ${product_price}</p>
      <p>Comments: {product_comments ? product_comments.length : 0}</p>
      <button onClick={handleCardClick}>View Details</button>
      <button>Add to Cart</button>
      <button>Buy Now</button>
      <button>Add to Favorites</button>
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
