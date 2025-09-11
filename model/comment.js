import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  },
  text: {
    type: String,
    default: "",
  }
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;