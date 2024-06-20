import Comment from '../../models/commentModel.js';
import Product from '../../models/productModel.js';
// import RequestError from '../../helpers/errors/requestError.js';

const createComment = async (req, res) => {
  const { text } = req.body;
  const author = req.user.username
  const productId = req.params.id;
 
  try {
      const newComment = new Comment({ text, author, product: productId });
      await newComment.save();

      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }
      product.product_comments.push(newComment._id);
      await product.save();

      res.status(201).json({ data: newComment });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const getCommentsByProductId = async (req, res) => {
  try {
    const productId = req.params.id; 

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
  getCommentsByProductId,
  deleteComment
};
