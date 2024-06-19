import React, { useState, useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import './ProductList.css';
import UserContext from '../../context/userContext';
import { updateProduct, addComment, deleteComment, getComments } from '../../utils/fetch';
import { getToken } from '../../utils/local';

const initialData = {
    product_image: '',
    product_name: '',
    product_description: '',
    product_model: '',
    product_price: '',
    product_type: '',
    product_amount: ''
};

const ProductsList = () => {
    const [products, setProducts] = useState(useLoaderData());
    const { user } = useContext(UserContext);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editFormData, setEditFormData] = useState(initialData);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [selectedProductComments, setSelectedProductComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const token = getToken();
    console.log("token", token)

    const handleEditOpen = (productId) => {
        const productToEdit = products.find((product) => product._id === productId);
        setEditFormData(productToEdit);
        setEditingProductId(productId);
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        const result = await updateProduct(editingProductId, editFormData);
        if (result) {
            alert('Product updated successfully!');
            const updatedProducts = products.map(product =>
                product._id === editingProductId ? { ...product, ...editFormData } : product
            );
            setProducts(updatedProducts);
        } else {
            alert('Error updating product.');
        }
        handleEditClose();
    };

    const handleOpenComments = async (productId) => {
        try {
            const comments = await getComments(productId);
            setSelectedProductComments(Array.isArray(comments) ? comments : []);
            setSelectedProductId(productId);
            setShowCommentsModal(true);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const updatedComments = await addComment(selectedProductId, { text: newComment });

            setProducts(products.map(product => {
                if (product._id === selectedProductId) {
                    return { ...product, product_comments: updatedComments, product_comments_count: updatedComments.length };
                }
                return product;
            }));

            setNewComment('');
            alert('Comment added successfully!');    
            setShowCommentsModal(false);

        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleEditClose = () => {
        setEditingProductId(null);
        setEditFormData(initialData);

        setProducts(products.map(product => {
            if (product._id === selectedProductId) {
                return { ...product, product_comments: selectedProductComments };
            }
            return product;
        }));
        setShowCommentsModal(false); 
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) {
            return;
        }
        try {
            const updatedComments = await deleteComment(selectedProductId, commentId);
            setSelectedProductComments(Array.isArray(updatedComments) ? updatedComments : []);
            setProducts(products.map(product =>
                product._id === selectedProductId ? { ...product, product_comments: updatedComments } : product
            ));
            setShowCommentsModal(false);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const productsHtml = products.map((product) => (
        <article className="product-list-element" key={product._id}>
            <img src={product.product_image} alt="Product" />
            <h2>{product.product_name}</h2>
            <p>${product.product_price}</p>
            {product.product_comments.length !== 0 && (
                <p onClick={() => handleOpenComments(product._id)} className="comments-link">
                    Show comments
                </p>
            )}
            <p>{product.product_amount > 0 ? 'In Stock' : 'Out of Stock'}</p>
            <Link to={`/products/${product._id}`}>More info</Link>
            {user && user.role === 'admin' && (
                <button onClick={() => handleEditOpen(product._id)} className="edit-button">
                    Edit Product
                </button>
            )}
        </article>
    ));

    return (
        <>
            <h1 className="page-title">Checkout our products</h1>
            <section className="product-list">
                {productsHtml}
            </section>

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
                                onChange={(e)=> setEditFormData({ ...editFormData, product_amount: e.target.value })}
                            />

                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}

            {showCommentsModal && (
                <div className="modal" onClick={() => setShowCommentsModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => setShowCommentsModal(false)}>&times;</span>
                        <h2>Comments</h2>

                        {user && user.role === 'user' && (
                            <div className="add-comment-section">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment"
                                />
                                <button onClick={handleAddComment}>Add Comment</button>
                            </div>
                        )}
                        <div className="comments-section">
                            {selectedProductComments.map((comment) => (
                                <div key={comment._id} className="comment">
                                    <p>{comment.text}</p>
                                    <p>Posted by: {comment.author}</p>
                                    <p>Date: {new Date(comment.date).toLocaleString()}</p>
                                    {user && user.role === 'admin' && (
                                        <button onClick={() => handleDeleteComment(comment._id)}>Remove Comment</button>
                                    )}

                       
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductsList;
