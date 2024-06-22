import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { closeCart, removeProductFromCart , addProductToCart} from '../../utils/fetch';
import "./Cart.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const initialCart = useLoaderData();
    const [cart, setCart] = useState(initialCart);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(!cart.cartProducts){
            return
        }
        const newTotal = cart.cartProducts.reduce((sum, product) => sum + product.product_price*product.quantity, 0);
        setTotal(newTotal);
    }, [cart]);

    const handleCloseCart = async (cartId) => {
        try {
            const closedCart = await closeCart(cartId);
         
            setCart(closedCart);
            toast.success('You buy it, thanks for shopping');
        } catch (error) {
            console.error('Error closing cart:', error);
        }
    }
    const handleRemoveProduct = async (productId) => {
        try {
            const updatedCart = await removeProductFromCart(productId);
        
            
            if (!updatedCart) {
                return navigate('/products');
            } else {
                toast.success('Product removed from cart');
            }
            setCart(updatedCart);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };
    const handleAddToCart = async (productId) => {
        try {
        
                const updatedCart = await addProductToCart(productId);
                console.log('Product added to cart:', updatedCart);
                
                if(!updatedCart) {
                    return navigate('/products');
                
            } else {
                toast.success('Product added to cart');
            }
            setCart(updatedCart);
        } catch (error) {
            console.error('Error adding product to cart:', error);
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
                        <img src={product.product_image} alt="Product" className="cart-img"/>
                        <div className="cart-info">
                        <h2>{product.product_name}</h2>
                        <p>{product.product_model}</p>
                        <p>{product.product_price}$</p>
                        </div>
                        <div className="cart-quantity">
                        <button className="button-quantity" onClick={() => handleRemoveProduct(product._id)}> - </button>
                        <p className="button-number">Cantidad: {product.quantity}</p>
                        <button className="button-quantity" onClick={() => handleAddToCart(product._id)}> + </button>
                        </div>
                        
                    </article>
                ))}
                <div className="cart-total">
                <h3>Total:  { total}$</h3>
                <button onClick={() => handleCloseCart(cart._id)}>Buy</button>
                </div>
            </section>
            <ToastContainer position='top-right' autoClose={1000}/>
        </>
    );
}

export default Cart;

