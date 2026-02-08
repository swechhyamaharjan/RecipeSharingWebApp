import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {email, z} from "zod";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  bio: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
   otp: {
    type: String,
    required: false
  },
    favorites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }
  ],
  recipes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }
  ],
  likedRecipes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }
  ]
},{
  timestamps: true,
})

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchedPassword = async function(enteredPassword){
 return await bcrypt.compare(enteredPassword, this.password);
}

export const userAddSchema = z.object({
  fullname: z.string().min(6),
  email: z.string().email(),
  password: z.string().min(6),
  isAdmin: z.boolean().default(false)
})

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const User = mongoose.model("User", userSchema);

export default User;