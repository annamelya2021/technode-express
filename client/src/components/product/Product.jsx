import React, { useContext, useState, useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { addProductToCart } from '../../utils/fetch';
import { addToFavorites, removeFromFavorites } from '../../utils/local';
import './Product.css';
import UserContext from '../../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ onRemove,product}) => {
    //const product = useLoaderData();
    const [isFavorite, setIsFavorite] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (product) {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setIsFavorite(favorites.includes(product._id));
        }
    }, [product]);

    const handleAddToCart = async () => {
        try {
            if (user) {
                const updatedCart = await addProductToCart(product._id);
            
                toast.success('Product added to cart');
            } else {
                toast.error('Please register or log in to add to cart.');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleAddToFavorites = () => {
        toast.success('Product added to favorites');
    };

    const handleToggleFavorite = () => {
        if (product && isFavorite) {
            removeFromFavorites(product._id);
            if (onRemove) onRemove(product._id);
        } else if (product) {
            addToFavorites(product._id);
            handleAddToFavorites();
        }
        setIsFavorite(!isFavorite);
    };

    if (!product) {
        return <p>Loading...</p>;
    }

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
            <ToastContainer position='top-right' autoClose={1000}/>
        </article>
    );
};

export default Product;


