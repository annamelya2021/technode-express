// components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductList;
