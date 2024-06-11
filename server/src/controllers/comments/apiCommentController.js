import Comment from '../../models/commentModel.js';
import Product from '../../models/productModel.js';
// import RequestError from '../../helpers/errors/requestError.js';

const createComment = async (req, res) => {
  try {
    const  productId  = req.params.id;
    const { text} = req.body;
    // console.log("req.user:", req.user);  // Додайте цей рядок
    const author = req.user ? req.user._id : null; 
    //console.log("req.body", req.body) 
    //console.log( "postId", postId);

    const newComment = new Comment({ text, author, product: productId });
    await newComment.save();

    await Product.findByIdAndUpdate(productId, { $push: { comments: newComment._id } });
    
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCommentsByPostId = async (req, res) => {
  try {
    const productId = req.params.id; // Ensure this matches the route parameter
    const comments = await Comment.find({ product: productId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id: productId, commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment || comment.product.toString() !== productId) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await Comment.findByIdAndDelete(commentId);
    await Product.findByIdAndUpdate(productId, { $pull: { product_comments: commentId } });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createComment,
  getCommentsByPostId,
  deleteComment
};
