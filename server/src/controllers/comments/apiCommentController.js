import Comment from '../../models/commentModel.js';
import Post from '../../models/postModel.js';
// import RequestError from '../../helpers/errors/requestError.js';

const createComment = async (req, res) => {
  try {
    const  postId  = req.params.postId;
    const { text} = req.body;
    const author = req.user._id;  
    //console.log("req.body", req.body) 
    //console.log( "postId", postId);

    const newComment = new Comment({ text, author, post: postId });
    await newComment.save();

    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
    
    res.status(201).json({ message: 'Comment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    
    const comment = await Comment.findById(commentId);
    if (!comment || comment.post.toString() !== postId) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await Comment.findByIdAndDelete(commentId);
    
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
    
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
