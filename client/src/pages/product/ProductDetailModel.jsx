import React, { useEffect, useState } from 'react';
import './ProductDetailModel.css';
import { getComments, createComments, deleteComments } from '../../utils/fetch';
import { getToken } from '../../utils/local';
import moment from 'moment';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { product_image, product_name, product_price, product_description, _id } = product;
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const token = getToken();

  const fetchComments = async () => {
    try {
      const response = await getComments(_id);
      setComments(response);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
    // Додати залежність isOpen в useEffect
  }, [_id, isOpen]); // Додано isOpen до залежностей useEffect

  const handleAddComment = async () => {
    if (!commentText) return;
    try {
      const newComment = await createComments(_id, { text: commentText });
    //   console.log(newComment);
      setComments([...comments, newComment.data]); 
      console.log(comments); // Оновлюємо стан, додаючи новий коментар
      setCommentText(''); // Очищаємо поле вводу після успішного додавання коментаря
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComments(_id, commentId);
      const updatedComments = comments.filter(comment => comment._id !== commentId);
      setComments(updatedComments); // Оновлюємо стан, видаляючи коментар з масиву
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleOutsideClick}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={product_image} alt={product_name} className="modal-product-image" />
        <h3>{product_name}</h3>
        <p>Price: ${product_price}</p>
        <p>{product_description}</p>
        <h4>Comments:</h4>
        <div className="comments-section">
          {comments.length > 0 ? comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>{comment.text}</p>
              <p>Author: {comment.author}</p>
              <p>Created at: {moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              {token && (
                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
              )}
            </div>
          )) : <p>No comments yet.</p>}
        </div>
        {token && (
          <div className="add-comment">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailModal;
