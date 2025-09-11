import mongoose from "mongoose";

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
  }
},{
  timestamps: true,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;