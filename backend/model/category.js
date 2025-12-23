import mongoose from "mongoose";
import {z} from "zod";

const categorySchema = new mongoose.Schema({
  name:{
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  description:{
   type: String
  }
}, {
  timestamps: true
})

export const categoryAddSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
})

const Category = mongoose.model("Category", categorySchema);

export default Category;