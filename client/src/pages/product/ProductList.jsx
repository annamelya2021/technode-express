import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import './ProductList.css';
import { getProducts } from '../../utils/fetch.js';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.error) {
          throw new Error(response.error);
        }
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
