import mongoose from "mongoose";
import {z} from "zod";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  text: {
    type: String,
    default: "",
  }
}, {
  timestamps: true
})

export const commentAddSchema = z.object({
  recipe: z.string().min(1, "Recipe ID is required"),
  text: z.string().min(1, "Comment text is required"),
})


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;