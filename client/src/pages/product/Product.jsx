import React, { useContext, useState } from 'react';
import { useLoaderData, Link, useSearchParams } from 'react-router-dom';
import { addProductToCart } from '../../utils/fetch';
import { addToFavorites, removeFromFavorites } from '../../utils/local';
import './Product.css';
import UserContext from '../../context/userContext';


// const [isFavorite, setIsFavorite] = useState();

const Product = () => {
    const product = useLoaderData();
    const { user } = useContext(UserContext);

    const handleAddToCart = async () => {
        try {
            if (user) {
                const updatedCart = await addProductToCart(product._id);
                console.log('Product added to cart:', updatedCart);
                alert('Product added to cart');
            } else {
                alert('Please register or log in to add to cart.');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleAddToFavorites = () => {
        alert('Product added to favorites');
    };

    const handleToggleFavorite = () => {
        if (product && isFavorite) {
          removeFromFavorites(product._id);
          if (onRemove) onRemove(product._id);
        } else if (product) {
          addToFavorites(product._id);
          handleAddToFavorites()
        }
        setIsFavorite(!isFavorite);
      };
    

    return (
        <article className="product-card" key={product._id}>
            <img src={product.product_image} alt={product.product_name} />
            <div className="product-card-content">
                <h2>{product.product_name}</h2>
                <p>{product.product_description}</p>
                <div className="product-card-price-action">
                    <p className="price">{`$${product.product_price}`}</p>
                    {product.product_amount > 0 ? (
                        user ? (
                            user.role !== 'admin' && (
                                <>
                                <button onClick={handleAddToCart}>Add to Cart</button>
                                <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
                                </>
                            )
                        ) : (
                            <div className="register-login-message">
                                <p>Please log in to add to cart.</p>
                                <Link to="/register" className="register-link">Login</Link>
                            </div>
                        )
                    ) : (
                        <p className="out-of-stock">Out of Stock</p>
                    )}
                </div>
            </div>
        </article>
    );
};

export default Product;
