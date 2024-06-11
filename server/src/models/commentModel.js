import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
