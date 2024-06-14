import { useLoaderData } from "react-router-dom";
import "./Cart.css";


const Cart = () => {
    const cart = useLoaderData();
    console.log('cart', cart);
    const total = cart.reduce((sum, product) => sum + product.product_price, 0);
    return (
        <>
            <h1>This is your cart</h1>
            <section className="cart">
                {cart.map(product => (
                    <article className="cart-card" key={product._id}>
                        <img src={product.product_image} alt="Product" />
                        <h2>{product.product_name}</h2>
                        <p>{product.product_model}</p>
                        <p>{product.product_price}</p>
                    </article>
                ))}
            <h3>Total{total}</h3>
            </section>
        </>
    );
}


export default Cart;