import React, { useEffect, useState } from 'react'
import { getCart } from '../../utils/fetch';

const Cart = () => {
const [cartData, setCartData] = useState([]);
// console.log('cartData :>> ', cartData);
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await getCart();
            console.log('response :>> ', response.cartProducts);
            if (response.error) {
              throw new Error(response.error);
            }
            setCartData(response.cartProducts);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        fetchProducts();
      }, []);

  return (
    <div>
      cart
    </div>
  )
}

export default Cart
