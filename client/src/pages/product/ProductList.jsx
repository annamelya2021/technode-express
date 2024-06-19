// import { useState, useContext } from "react";
// import { Link, useLoaderData } from "react-router-dom";
// import "./ProductList.css";
// import UserContext from "../../context/userContext"; 
// import {updateProduct} from "../../utils/fetch";

// const ProductsList = () => {
//     const [products, setProducts] = useState(useLoaderData());
//     const { user } = useContext(UserContext); 

//     const productsHtml = products.map(product => (
//         <article className="product-list-element" key={product._id}>
//             <img src={product.product_image} alt="Product" />
//             <h2>{product.product_name}</h2>
//             <p>${product.product_price}</p>
//             <p>{product.product_comments.length} Comments</p>
//             <p>{product.product_amount > 0 ? "In Stock" : "Out of Stock"}</p> 
//             <Link to={`/products/${product._id}`}>More info</Link>
//             {user && user.role === "admin" && ( 
//                 <Link to={`/products/edit/${product._id}`} className="edit-button">Edit Product</Link>
//             )}
//         </article>
//     ));

//     return (
//         <>
//             <h1 className="page-title">Checkout our products</h1>
//             <section className="product-list">
//                 {productsHtml}
//             </section>
//         </>
//     );
// };

// export default ProductsList;


import React, { useState, useContext } from 'react';
import { Link, Navigate, useLoaderData } from 'react-router-dom';
import './ProductList.css';
import UserContext from '../../context/userContext';
import { updateProduct } from '../../utils/fetch';

const initialData = {  product_image: '',
    product_name: '',
    product_description: '',
    product_model: '',
    product_price: '',
    product_type: '',
    product_amount: '',}
const ProductsList = () => {
    const [products, setProducts] = useState(useLoaderData());
    const { user } = useContext(UserContext);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editFormData, setEditFormData] = useState(initialData);

    const handleEditOpen = (productId) => {
        const productToEdit = products.find((product) => product._id === productId);
        setEditFormData(productToEdit);
        setEditingProductId(productId);
    };

    const handleEditClose = () => {
        setEditingProductId(null);
        setEditFormData(initialData);
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        const result = await updateProduct(editingProductId, editFormData);
        if (result) {
            alert('Product updated successfully!');
        } else {
            alert('Error updating product.');
        }
        handleEditClose();
       
    };

    const productsHtml = products.map((product) => (
        <article className="product-list-element" key={product._id}>
            <img src={product.product_image} alt="Product" />
            <div className="product-info">
            <h2>{product.product_name}</h2>
            <p>${product.product_price}</p>
            <p>{product.product_comments.length} Comments</p>
            <p>{product.product_amount > 0 ? 'In Stock' : 'Out of Stock'}</p>
            <Link to={`/products/${product._id}`}>More info</Link>
            {user && user.role === 'admin' && (
                <button onClick={() => handleEditOpen(product._id)} className="edit-button">
                    Edit Product
                </button>
            )}
            </div>
        </article>
    ));

    return (
        <>
            <h1 className="page-title">Checkout our products</h1>
            <section className="product-list">
                {productsHtml}
            </section>

            {/* Modal or Form for Editing Product */}
            {editingProductId && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleEditClose}>&times;</span>
                        <h2>Edit Product</h2>
                        <form onSubmit={handleEditSave}>
                            <label htmlFor="product_image">Product Image</label>
                            <input
                                type="text"
                                name="product_image"
                                value={editFormData.product_image}
                                onChange={(e) => setEditFormData({ ...editFormData, product_image: e.target.value })}
                            />

                            <label htmlFor="product_name">Product Name</label>
                            <input
                                type="text"
                                name="product_name"
                                value={editFormData.product_name}
                                onChange={(e) => setEditFormData({ ...editFormData, product_name: e.target.value })}
                            />

                            <label htmlFor="product_description">Product Description</label>
                            <input
                                type="text"
                                name="product_description"
                                value={editFormData.product_description}
                                onChange={(e) => setEditFormData({ ...editFormData, product_description: e.target.value })}
                            />

                            <label htmlFor="product_model">Product Model</label>
                            <input
                                type="text"
                                name="product_model"
                                value={editFormData.product_model}
                                onChange={(e) => setEditFormData({ ...editFormData, product_model: e.target.value })}
                            />

                            <label htmlFor="product_price">Product Price</label>
                            <input
                                type="text"
                                name="product_price"
                                value={editFormData.product_price}
                                onChange={(e) => setEditFormData({ ...editFormData, product_price: e.target.value })}
                            />

                            <label htmlFor="product_type">Product Type</label>
                            <select
                                name="product_type"
                                value={editFormData.product_type}
                                onChange={(e) => setEditFormData({ ...editFormData, product_type: e.target.value })}
                            >
                                <option value="">Choose Type</option>
                                <option value="mobile">Mobile</option>
                                <option value="laptop">Laptop</option>
                            </select>

                            <label htmlFor="product_amount">Product Amount</label>
                            <input
                                type="text"
                                name="product_amount"
                                value={editFormData.product_amount}
                                onChange={(e) => setEditFormData({ ...editFormData, product_amount: e.target.value })}
                            />

                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductsList;
