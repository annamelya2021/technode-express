import React, { useState, useEffect, useContext } from 'react';
import Popup from 'reactjs-popup';
import { getCarts, update, getProduct } from '../../utils/fetch';
import './Profile.css';
import UserContext from '../../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [carts, setCarts] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Доданий стейт для відображення загрузки

    // Fetch bought carts history
    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const userId = user._id;
                const cartsData = await getCarts(userId);
                if (!cartsData.error) {
                    setCarts(cartsData);
                } else {
                    console.log(cartsData.error);
                }
            } catch (error) {
                console.error("Error fetching carts:", error);
            }
        };
        
        if (user) {
            fetchCarts();
        }
    }, [user]);

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            try {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const products = await Promise.all(
                    favorites.map(async productId => {
                        const response = await getProduct(productId);
                        return response.data;
                    })
                );
                setFavoriteProducts(products);
                setLoading(false); // Відключаємо загрузку після завершення запиту
            } catch (error) {
                console.error('Failed to load favorite products:', error);
                setLoading(false); // Обробка помилок загрузки
            }
        };

        fetchFavoriteProducts();
    }, []);

    const removeFavorite = (productId) => {
        const updatedFavorites = favoriteProducts.filter(product => product._id !== productId);
        setFavoriteProducts(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites.map(product => product._id)));
    };

    const handleUpdateUser = async (userData) => {
        try {
            const result = await update(userData);
            if (result && result.data) {
                setUser(result.data);
                toast.success('User updated successfully!');
            } else {
                alert('Error updating user.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            _id: user._id,
            username: e.target.username.value,
            lastname: e.target.lastname.value,
            phone: e.target.phone.value,
            user_direction: e.target.user_direction.value
        };
        handleUpdateUser(userData);
    };

    if (!user || loading) { 
        return <p>Loading...</p>;
    }

    return (
        <>
        <div className="profile-container">
            {/* User Information */}
            <article className="section-container user-card" key={user._id}>
                <h2>{user.email}</h2>
                <p>Name: {user.username}</p>
                <p>Last Name: {user.lastname}</p>
                <p>Phone: {user.phone}</p>
                <p>Address: {user.user_direction}</p>
                <div>
                    <Popup
                        trigger={<button className="">Update user</button>}
                        modal
                        nested
                    >
                        {close => (
                            <div className='updateUser-modal'>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="username">User Name</label>
                                    <input type="text" name="username" defaultValue={user.username} />
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" name="lastname" defaultValue={user.lastname} />
                                    <label htmlFor="phone">Phone</label>
                                    <input type="number" name="phone" defaultValue={user.phone} />
                                    <label htmlFor="user_direction">Address</label>
                                    <input type="text" name="user_direction" defaultValue={user.user_direction} />
                                    <button type="submit">Update</button>
                                </form>
                            </div>
                        )}
                    </Popup>
                </div>
            </article>

            {/* Bought Carts History */}
            <article section-container cart-history>
                <div>
                    <h3>Bought Carts History</h3>
                    {carts.map(cart => (
                        <div key={cart._id} className="cart-card-history">
                            <h4>Cart ID: {cart._id}</h4>
                            <ul>
                                {cart.cartProducts.map(product => (
                                    <li key={product._id}>
                                        {product.product_name} - {product.product_price} - {product.quantity} Units
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </article>

            {/* Favorite Products */}
            <div className="favorite-products">
                <h2 className="favorite-products-title" >Favorite Products</h2>
                <div className="favorite-product-list">
                    {favoriteProducts.length > 0 ? (
                        favoriteProducts.map(product => (
                            <div  key={product._id} className="favorite-product-card">
                                 <button onClick={() => removeFavorite(product._id)}>Remove</button>
                                <img src={product.product_image} alt={product.product_name} />
                                <p>{product.product_name}</p>
                                <p>${product.product_price}</p>
                                <p>{product.product_description}</p>
                                <p>{product.product_model}</p>
                               
                            </div>
                        ))
                    ) : (
                        <p>No favorite products found.</p>
                    )}
                </div>
            </div>
            </div>
           
        </>
    );
};

export default Profile;
