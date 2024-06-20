// components/ProductCard.jsx

import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import { getComments, deleteComment, addComment, updateProduct } from '../../../utils/fetch';
import EditProductModal from '../../modal/EditProductModal';
import CommentsModal from '../../modal/commentsModal';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onOpenDetails, user , setReFetch}) => {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProductComments, setSelectedProductComments] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    product_image: '',
    product_name: '',
    product_description: '',
    product_model: '',
    product_price: '',
    product_type: '',
    product_amount: ''
  });
  const [editingProductId, setEditingProductId] = useState(null); // Додаємо цей рядок

  const handleOpenDetails = () => {
    onOpenDetails(product);
  };

  

  const handleOpenComments = async (productId) => {
    try {
      console.log('Fetching comments for product:', productId);
      const comments = await getComments(productId);
      setSelectedProductComments(Array.isArray(comments) ? comments : []);
      setSelectedProductId(productId);
      setShowCommentsModal(true);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleEditOpen = () => {
    console.log('Opening edit modal for product:', product._id);
    setEditFormData({
      product_image: product.product_image,
      product_name: product.product_name,
      product_description: product.product_description,
      product_model: product.product_model,
      product_price: product.product_price,
      product_type: product.product_type,
      product_amount: product.product_amount
    });
    setEditingProductId(product._id); 
    setShowEditProductModal(true);
  };

  const handleEditClose = () => {
    setShowEditProductModal(false);
  };

  const handleEditSave = async (newData) => {

    try {
      // Виведення даних з полів у консоль    
      const result = await updateProduct(editingProductId, newData);
      if (result) {
        alert('Product updated successfully!');
        setEditFormData({ ...result }); 
        setReFetch(true);
      } else {
        alert('Error updating product.');
      }
      handleEditClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    try {
      console.log('Deleting comment:', commentId);
      const updatedComments = await deleteComment(selectedProductId, commentId);
      setSelectedProductComments(Array.isArray(updatedComments) ? updatedComments : []);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleAddComment = async (comment) => {
    try {
      console.log('Adding comment:', comment);
      const updatedComment = await addComment(selectedProductId, comment);
      return updatedComment.data;
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <>
      <div className="product-card">
        <img src={product.product_image} alt={product.product_name} className="product-image" />
        <div className="product-details">
          <h2 className="product-name">{product.product_name}</h2>
          <p>{product.product_description}</p>
          <p>{product.product_model}</p>

          { (
            <p onClick={() => handleOpenComments(product._id)} className="comments-link">
              Show comments
            </p>
          )}
          <p>{product.product_amount > 0 ? 'In Stock' : 'Out of Stock'}</p>
          <p className="product-price">${product.product_price}</p>
          {/* <button className="details-button" onClick={handleOpenDetails}>
            More Info
          </button> */}
          <Link to={`/products/${product._id}`} className="details-button">
            More Info   
          </Link>

          {user?.data?.role === 'admin' && (
            <button onClick={handleEditOpen} className="edit-button">
              Edit Product
            </button>
          )}
        </div>
      </div>
      {showCommentsModal && (
        <CommentsModal
          comments={selectedProductComments}
          onClose={() => setShowCommentsModal(false)}
          onDeleteComment={handleDeleteComment}
          onAddComment={handleAddComment}
          productId={selectedProductId}
          productName={product.product_name}
          user={user}
        />
      )}
      {showEditProductModal && (
        <EditProductModal
          product={editFormData}
          onClose={handleEditClose}
          onSave={handleEditSave}
        />
      )}
    </>
  );
};

export default ProductCard;
