import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import CreateProduct from "../../components/product/CreateProduct";

const ProductsList = () => {
    const [products,setProducts] = useState(useLoaderData());
    const [creatingProduct,setCreatingProduct] = useState(false);
    const productsHtml = products.map(product => 
        
        (
            <article className="product-list-element" key={product._id}>
                <img src={product.product_image} alt="Product" />
                <h2>{product.product_name}</h2>
                <p>{product.product_description}</p>
                <p>{product.product_model}</p>
                <p>{product.product_price}</p>
            </article>
            
        )
    )
    return (
        <>
        <h1>Checkout our products</h1>
        
            <section className="product-list">
                {productsHtml}
            </section>
            {creatingProduct ?
            <Modal onClose={()=>setCreatingProduct(false)}>
                <CreateProduct onCreate={()=>setCreatingProduct(false)}/>
            </Modal>
            :
            <button onClick={()=>setCreatingProduct(true)}>New Product</button>
        }
        </>
    )
}

export default ProductsList