import React, { useEffect, useState } from 'react';
import './ProductDetailModel.css';
import axios from 'axios';
import {getComments, createComments} from '../../utils/fetch';
import { getToken } from '../../utils/local';


const ProductDetailModal = ({ product, isOpen, onClose}) => {
  const { product_image, product_name, product_price, product_description, product_comments, _id } = product;
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(product_comments || []);
 const token = getToken();
  const handleAddComment = async () => {
    if (!commentText) return;
    try {
      const response = await createComments (_id, {text: commentText});
      setComments([...comments, response]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };



  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(_id);
        setComments(response);      
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchComments();
  }, []);


  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal') {
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
          {comments.length > 0 ? comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment.text}</p>
              <p>{comment.author}</p>
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
