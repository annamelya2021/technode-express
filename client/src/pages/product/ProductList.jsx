import { useState, useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import "./ProductList.css";
import UserContext from "../../context/userContext"; 

const ProductsList = () => {
    const [products, setProducts] = useState(useLoaderData());
    const { user } = useContext(UserContext); 

    const productsHtml = products.map(product => (
        <article className="product-list-element" key={product._id}>
            <img src={product.product_image} alt="Product" />
            <h2>{product.product_name}</h2>
            <p>{product.product_price}</p>
            <p>{product.product_comments.length} Comments</p>
            <p>{product.product_amount > 0 ? "In Stock" : "Out of Stock"}</p> 
            <Link to={`/products/${product._id}`}>More info</Link>
            {user && user.role === "admin" && ( 
                <Link to={`/products/edit/${product._id}`} className="edit-button">Edit Product</Link>
            )}
        </article>
    ));

    return (
        <>
            <h1 className="page-title">Checkout our products</h1>
            <section className="product-list">
                {productsHtml}
            </section>
        </>
    );
};

export default ProductsList;
