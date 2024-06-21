import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { getProducts, getUserData } from "../../utils/fetch";
import ProductCard from '../../components/product/productCard/productCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [reFetch, setReFetch] = useState(false);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchUserData();
    setReFetch(false);
  }, [reFetch]);

  useEffect(() => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.product_type === category);
      setFilteredProducts(filtered);
    }
  }, [products, category]);

  const fetchProducts = async () => {
    try {
      const result = await getProducts();

      if (!result.error) {
        setProducts(result.data);
        setFilteredProducts(result.data);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const filteredAndSearchedProducts = filteredProducts.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetails = (product) => {
   
  };

  return (
    <div className="product-list">    

      <div className="filters">
        <input className="search-input"
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => handleCategoryChange('mobile')}>Phones</button>
        <button onClick={() => handleCategoryChange('laptop')}>Laptops</button>
        <button onClick={() => handleCategoryChange('all')}>All Products</button>
      </div>

      <div className="cards-container">
        {filteredAndSearchedProducts.map((product) => (
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
