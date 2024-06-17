// Product.jsx
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { addProductToCart } from '../../utils/fetch';
import "./Product.css";

const Product = () => {
    const product = useLoaderData();

    const handleAddToCart = async () => {
        try {
            const updatedCart = await addProductToCart(product._id);
            console.log('Product added to cart:', updatedCart);
            alert('Product added to cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <article className="product-card" key={product._id}>
            <img src={product.product_image} alt={product.product_name} />
            <div className="product-card-content">
                <h2>{product.product_name}</h2>
                <p>{product.product_description}</p>
                <div className="product-card-price-action">
                    <p className="price">{`$${product.product_price}`}</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </article>
    );
}

export default Product;
