import React, { useState } from 'react';
import moment from 'moment';
import './ProductCard.css';
import '../../modal/ConfirmationModal.css';
import './CommentsModal.css';
import { getComments, deleteComment, addComment, updateProduct } from '../../../utils/fetch';
import EditProductModal from '../../modal/EditProductModal';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../modal/ConfirmationModal';


const ProductCard = ({ product, onOpenDetails, user, setReFetch }) => {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedProductComments, setSelectedProductComments] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    product_image: '',
    product_name: '',
    product_description: '',
    product_model: '',
    product_price: '',
    product_type: '',
    product_amount: ''
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // Стан для показу підтвердження
  const [commentToDelete, setCommentToDelete] = useState(''); // Стан для зберігання ID коментаря для видалення

  const handleOpenDetails = () => {
    onOpenDetails(product);
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

  const handleEditOpen = () => {
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
    setCommentToDelete(commentId);
    setShowConfirmation(true);
  };

  const confirmDeleteComment = async () => {
    try {
      await deleteComment(selectedProductId, commentToDelete);
      setSelectedProductComments(selectedProductComments.filter(comment => comment._id !== commentToDelete));
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const cancelDeleteComment = () => {
    setShowConfirmation(false);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const addedComment = await addComment(selectedProductId, { text: newComment });
      setComments([...comments, addedComment]);
      setSelectedProductComments([...selectedProductComments, addedComment]);
      setNewComment('');
      alert('Comment added successfully!');
       setSelectedProductComments([...selectedProductComments, addedComment]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal-comments')) {
      setShowCommentsModal(false);
    }
  };

  return (
    <>
      <div className="one-product-card">
        <img src={product.product_image} alt={product.product_name} className="one-product-image" />
        <div className="one-product-details">
          <h2 className="one-product-name">{product.product_name}</h2>
          <p className="one-product-description">{product.product_description}</p>
          <p className="one-product-model">{product.product_model}</p>

          <p onClick={() => handleOpenComments(product._id)} className="comments-link">
            Show comments
          </p>
          <p className="one-product-amount">{product.product_amount > 0 ? 'In Stock' : 'Out of Stock'}</p>
          <p className="one-product-price">${product.product_price}</p>
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
        <div className="modal-comments" onClick={handleClickOutside}>
          <div className="modal-comments-content">
            <span className="close" onClick={() => setShowCommentsModal(false)}>&times;</span>
            <h2>{`Comments for ${product.product_name}`}</h2>
            <div className="comments-section">
              {selectedProductComments.map((comment) => (
                <div className="comment" key={comment._id}>
                  <p>{comment.text}</p>
                  <p className="comment-author">Author: {comment.author}</p>
                  <p className="comment-date">Date: {moment(comment.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  {user?.data?.role === 'admin' && (
                    <button onClick={(event) => handleDeleteComment(comment._id)}>Delete</button>
                  )}
                </div>
              ))}
            </div>
            {(user?.data?.role === 'user' || user?.data?.role === 'admin') ? (
              <div className="add-comment-section">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="add comment"
                ></textarea>
                <button onClick={handleAddComment}>Add comment</button>
              </div>
            ) : (
              <p>Please register to add a comment.</p>
            )}
          </div>
        </div>
      )}
      {showEditProductModal && (
        <EditProductModal
          product={editFormData}
          onClose={handleEditClose}
          onSave={handleEditSave}
        />
      )}
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this comment?"
          onConfirm={confirmDeleteComment}
          onCancel={cancelDeleteComment}
        />
      )}
   
    </>
  );
};

export default ProductCard;
