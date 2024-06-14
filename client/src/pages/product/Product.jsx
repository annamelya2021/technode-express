import { useLoaderData } from "react-router-dom";
import "./Product.css";

const Product = () => {
    const product = useLoaderData();
    console.log('product', product);

    return (
        <article className="product-card" key={product._id}>
                <h2>{product.product_name}</h2>
                <p>{product.product_description}</p>
                <p>{product.product_model}</p>
                <p>{product.product_price}</p>
            </article>
    );
}

export default Product;