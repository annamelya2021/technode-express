import React, { useEffect, useState } from 'react';
import { getCart, updateQuantityInCart, removeProductFromCart, clearCart } from '../../utils/fetch';
import './Cart.css';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        if (response.error) {
          throw new Error(response.error);
        }
        setCartData(response.cartProducts);
        calculateTotals(response.cartProducts);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const calculateTotals = (cartProducts) => {
    const totalPrice = cartProducts.reduce((sum, item) => sum + item.product.product_price * item.quantity, 0);
    const totalQuantity = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const response = await updateQuantityInCart(productId, quantity);
      if (response.error) {
        throw new Error(response.error);
      }
      setCartData(response.cartProducts);
      calculateTotals(response.cartProducts);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await removeProductFromCart(productId);
      if (response.error) {
        throw new Error(response.error);
      }
      setCartData(response.cartProducts);
      calculateTotals(response.cartProducts);
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await clearCart();
      if (response.error) {
        throw new Error(response.error);
      }
      setCartData([]);
      setTotalPrice(0);
      setTotalQuantity(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetchData('/orders', 'post', { cart: cartData });
      if (response.error) {
        throw new Error(response.error);
      }
      alert('Order placed successfully!');
      handleClearCart();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <button onClick={handleClearCart}>Clear Cart</button>
      {cartData.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartData.map(item => (
            <div key={item.product._id} className="cart-item">
              <img src={item.product.product_image} alt={item.product.product_name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.product.product_name}</h3>
                <p>Price: ${item.product.product_price}</p>
                <p>
                  Quantity: 
                  <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}>+</button>
                </p>
                <button onClick={() => handleRemoveProduct(item.product._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
