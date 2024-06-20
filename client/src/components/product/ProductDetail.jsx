import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, addComment, deleteComment, getComments } from '../../utils/fetch';
import { getToken } from '../../utils/local';
import UserContext from '../../context/userContext';
import moment from 'moment';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const token = getToken();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProduct(id);
                setProduct(productData);
                const commentsData = await getComments(id);
                setComments(Array.isArray(commentsData) ? commentsData : []);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const updatedComments = await addComment(id, { text: newComment });
            setComments(updatedComments);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) {
            return;
        }
        try {
            const updatedComments = await deleteComment(id, commentId);
            setComments(updatedComments);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-details">
            <img src={product.product_image} alt={product.product_name} />
            <h1>{product.product_name}</h1>
            <p>{product.product_description}</p>
            <p>Price: ${product.product_price}</p>
            <p>Model: {product.product_model}</p>
            <p>Type: {product.product_type}</p>
            <p>{product.product_amount > 0 ? 'In Stock' : 'Out of Stock'}</p>

            <h2>Comments</h2>
            <div className="comments-section">
                {comments.map((comment) => (
                    <div className="comment" key={comment._id}>
                        <p>{comment.text}</p>
                        <p className="comment-author">Author: {comment.author}</p>
                        <p className="comment-date">Date: {moment(comment.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        {user && user.role === 'admin' && (
                            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                        )}
                    </div>
                ))}
            </div>
            {user && user.role === 'user' &&
                <div className="add-comment-section">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                    ></textarea>
                    <button onClick={handleAddComment}>Submit</button>
                </div>
            }
        </div>
    );
};

export default ProductDetails;
