// components/ProductList.jsx

import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { getProducts, getUserData } from "../../utils/fetch";
import ProductCard from '../../components/product/productCard/productCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
const [reFetch, setReFetch] = useState(false);
  useEffect(() => {
    fetchProducts();
    fetchUserData();
    setReFetch(false);

  }, [ reFetch]);

  const fetchProducts = async () => {
    try {
      const result = await getProducts();

      if (!result.error) {
        setProducts(result.data);
      } else {
        console.error('Error fetching products:', result.error);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await getUserData();
      if (!userData.error) {
        setUser(userData);
      } else {
        console.log('Error fetching user data:', userData.error);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const handleOpenDetails = (product) => {
    // console.log('Opening details for:', product);
    // Додайте код для відкриття деталей продукта
  };

  return (
    <div className="product-list">
      <h1>Our Products</h1>
      <div className="cards-container">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onOpenDetails={handleOpenDetails}
            user={user}
            setProducts={setProducts}
            setReFetch={setReFetch}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
