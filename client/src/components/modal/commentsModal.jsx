// import React, { useState } from 'react';
// import moment from 'moment';
// import './CommentsModal.css';

// const CommentsModal = ({ comments: initialComments, onClose, onDeleteComment, onAddComment, productId, productName, user }) => {
//   const [newComment, setNewComment] = useState('');
//   const [comments, setComments] = useState(initialComments);

//   const handleDeleteComment = async (commentId, event) => {
//     event.stopPropagation();
//     if (!window.confirm('Are you sure you want to delete this comment?')) {
//       return;
//     }
//     try {
//       await onDeleteComment(commentId);
//       setComments(comments.filter(comment => comment._id !== commentId));
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;
//     try {
//       const addedComment = await onAddComment({ text: newComment });
//       console.log("added comment",addedComment)
//       setComments([...comments, addedComment]);
//       setNewComment('');
//       alert('Comment added successfully!');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   const handleClickOutside = (e) => {
//     if (e.target.classList.contains('modal-comments')) {
//       onClose();
//     }
//   };
//   return (
//       <div className="modal-comments" onClick={handleClickOutside}>
//         <div className="modal-comments-content">
//           <span className="close" onClick={onClose}>&times;</span>
//           <h2>{`Comments for ${productName}`}</h2>
//           <div className="comments-section">
//             {comments.map((comment) => (
//               <div className="comment" key={comment._id}>
//                 <p>{comment.text}</p>
//                 <p className="comment-author">Author: {comment.author}</p>
//                 <p className="comment-date">Date: {moment(comment.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
//                 {user?.data?.role === 'admin' && (
//                   <button onClick={(event) => handleDeleteComment(comment._id, event)}>Delete</button>
//                 )}
//               </div>
//             ))}
//           </div>
//           {(user?.data?.role === 'user' || user?.data?.role === 'admin') ? (
//             <div className="add-comment-section">
//               <textarea
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="add comment"
//               ></textarea>
//               <button onClick={handleAddComment}>Add comment</button>
//             </div>
//           ) : (
//             <p>Please register to add a comment.</p>
//           )}
//         </div>
//       </div>
//   );
// };

// export default CommentsModal;
