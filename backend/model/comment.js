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
  },
  rating: {
  type: Number,
  required: true,
}
}, {
  timestamps: true
})

export const commentAddSchema = z.object({
  text: z.string().min(1, "Comment text is required"),
  rating: z.number().min(1).max(5), 
})


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;