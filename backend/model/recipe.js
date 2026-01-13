import mongoose from "mongoose";
import { z } from "zod";

const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  ingredients: [
    {
      type: String
    }
  ],
  instruction: [
    {
      type: String
    }
  ],
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  averageRating: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
}, {
  timestamps: true,
});

export const recipeAddSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  ingredients: z.union([
    z.array(z.string()).min(1),
    z.string() // allow string so form-data passes
  ]),
  instruction: z.union([
    z.array(z.string()).min(1),
    z.string()
  ]),
  image: z.string().optional(),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
  category: z.string().min(1, "Category ID is required"),
});


export const recipeUpdateSchema = recipeAddSchema.partial();

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;