import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { removeProductFromCart } from '../../utils/fetch';
import "./Cart.css";

const Cart = () => {
    const initialCart = useLoaderData();
    const [cart, setCart] = useState(initialCart);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(!cart.cartProducts){
            return
        }
        const newTotal = cart.cartProducts.reduce((sum, product) => sum + product.product_price, 0);
        setTotal(newTotal);
    }, [cart]);

    const handleRemoveProduct = async (productId) => {
        try {
            const updatedCart = await removeProductFromCart(productId);
            console.log('Product removed from cart:', updatedCart);
            
            if (!updatedCart) {
                return navigate('/products');
            } else {
                alert('Product removed from cart');
            }
            setCart(updatedCart);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };
    
    if(!cart.cartProducts || cart.cartProducts.length===0){
        return (
            <>
            <h1>There are no products in your cart</h1>
            <Link to={`/products`}>Look our staff</Link>
            </>
        )
    }
    return (
        <>
            <h1>This is your cart</h1>
            <section className="cart">
                {cart.cartProducts?.map(product => (
                    <article className="cart-card" key={product._id}>
                        <img src={product.product_image} alt="Product" />
                        <h2>{product.product_name}</h2>
                        <p>{product.product_model}</p>
                        <p>{product.product_price}</p>
                        <button onClick={() => handleRemoveProduct(product._id)}>Remove</button>
                    </article>
                ))}
                <h3>Total:  { total}</h3>
            </section>
        </>
    );
}

export default Cart;
