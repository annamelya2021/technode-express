import React, { useContext } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { addProductToCart } from '../../utils/fetch';
import './Product.css';
import UserContext from '../../context/userContext';

const Product = () => {
    const product = useLoaderData();
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

    return (
        <article className="product-card" key={product._id}>
            <img src={product.product_image} alt={product.product_name} />
            <div className="product-card-content">
                <h2>{product.product_name}</h2>
                <p>{product.product_description}</p>
                <div className="product-card-price-action">
                    <p className="price">{`$${product.product_price}`}</p>
                    {user ? (
                        user.role !== 'admin' && (
                            <button onClick={handleAddToCart}>Add to Cart</button>
                        )
                    ) : (
                        <div className="register-login-message">
                            <p>Please log in to add to cart.</p>
                            <Link to="/register" className="register-link">Login</Link>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default Product;
