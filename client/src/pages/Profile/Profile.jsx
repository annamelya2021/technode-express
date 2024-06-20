
import React, { useState, useEffect,useContext } from 'react';
import Popup from 'reactjs-popup';
import { getCarts, update, getProduct } from '../../utils/fetch';
import './Profile.css';
import Product from '../../components/product/Product';
import { removeFromFavorites } from '../../utils/local';
import UserContext from '../../context/userContext';
const Profile = () => {
    const {user, setUser} = useContext(UserContext);
    const [carts, setCarts] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

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
        fetchCarts();
    }, [user]);



    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            try {
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                console.log('Favorites from localStorage:', favorites);

                const products = await Promise.all(
                    favorites.map(async productId => {
                        const response = await getProduct(productId);
                        return response.data;
                    })
                );
                setFavoriteProducts(products);
            } catch (error) {
                console.error('Failed to load favorite products:', error);
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
        const result = await update( userData);
        if (result) {
            alert('User updated successfully!');
            if(!result || !result.data){
                return
            }
            setUser(result.data);
        } else {
            alert('Error updating user.');
        }
    };

    const handleSubmit = async (e) =>{
        close()
        e.preventDefault()
        const userData= {
            _id: user._id,
            username:e.target.username.value,
            lastname:e.target.lastname.value,
            phone:e.target.phone.value,
            user_direction:e.target.user_direction.value
        }
        handleUpdateUser(userData);
    }
    if(!user){
        return (<p>Loading...</p>)
    }

    return (
        <>
            {/* Información de usuario */}
            <article className="user-card" key={user._id}>
                <h2>{user.email}</h2>
                <p>Name: {user.username}</p>
                <p>Last Name: {user.lastname}</p>
                <p>Phone :{user.phone}</p>
                <p>Adress: {user.user_direction}</p>
                <div>
                    <Popup 
                        trigger={<button> Update user </button>} 
                        modal 
                        nested
                    >
                        {close => (
                            <div className='updateUser-modal'>
                                <form onSubmit={handleSubmit}>
                                
                                <label htmlFor="username">User Name</label>
                                <input type="text" name="username"  defaultValue={user.username}/>
                                
                                <label htmlFor="lastname">Last Name</label>
                                <input type="text" name="lastname" defaultValue={user.lastname}/>
                                
                                <label htmlFor="phone">Phone</label>
                                <input type="number" name="phone"  defaultValue={user.phone}/>

                                <label htmlFor="user_direction">Adress</label>
                                <input type="text" name="user_direction"  defaultValue={user.user_direction}/>
                                
                                <button>
                                    Update
                                </button>
                                
                                </form>
                            </div>
                        )}
                    </Popup>
                </div>
            </article>
            
            
            {/* Información de Favoritos y Carritos Comprados */}
            <article>
                <div></div>
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
                <h2>Favorite Products</h2>
                <div className="product-list">
                    {favoriteProducts.length > 0 ? (
                        favoriteProducts.map(product => (
                            <Product key={product._id} product={product} onRemove={() => removeFavorite(product._id)} />
                        ))
                    ) : (
                        <p>No favorite products found.</p>
                    )}
                </div>
            </div>
</>

    

    
    );
};

export default Profile;
