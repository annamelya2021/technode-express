import React, { useState } from 'react'


const CartProduct = ({ item, handleQuantityChange,}) => {
    const [totalQuantity, setTotalQuantity] = useState(0);
   

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

  return (
    <div key={item.product._id} className="cart-item">
    <img src={item.product.product_image} alt={item.product.product_name} className="cart-item-image" />
    <div className="cart-item-details">
      <h3>{item.product.product_name}</h3>
      <p>Price: ${item.product.product_price}</p>
    <div>
          <p>Count in stock: {item.product.product_amount - totalQuantity}</p>
          </div>

      <p>
        Quantity: 
        <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)} >-</button>
        {item.quantity}
        <button onClick={() =>{
             setTotalQuantity(totalQuantity + 1);
             handleQuantityChange(item.product._id, item.quantity + 1)}} disabled={item.quantity >= item.product.product_amount - totalQuantity}>+</button>
      </p>
      <button onClick={() => handleRemoveProduct(item.product._id)}>Remove</button>
    </div>
  </div>
  )
}

export default CartProduct
