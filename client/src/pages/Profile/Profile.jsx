import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { getCarts, update } from '../../utils/fetch';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState( useLoaderData());
    const [carts, setCarts] = useState([]);
    console.log("carts", carts);

    // Sacar todos los carritos de getCarts y mostrarlos en cards, pero solo los cerrados
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
                        <div key={cart._id} className="cart-card">
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
        </>
    );
};

export default Profile;
