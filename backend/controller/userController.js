import { email } from "zod";
import User from "../model/user.js"
import createToken from "../utils/generateToken.js";

const signup = async (req, res) => {
  const { fullname, email, password, isAdmin } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({ error: "User already exits" });
  }
  const newUser = await User.create({
    fullname,
    email,
    password,
    isAdmin
  })
  res.send({
    message: "User created successfully", User:
    {
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    }
  });
}

const login = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ error: "User doesn't exits of this email!" })
  if (await user.matchedPassword(password)) {
    createToken(res, user._id, rememberMe)
    res.send({
      message: "Login success", user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  } else {
    res.status(400).send({ error: "Password doesn't match" })
  }
}

const logout = async(req, res) => {
  if(req.user){
    res.clearCookie('jwt');
    res.send({message: "Logout success!"})
  }
  else{
    res.status(400).send({error: "You are not logged in!"})
  }
}

const getUserFavorite = async (req, res) => {
  try {
    const userId = req.user._id; 
     const user = await User.findById(userId)
      .populate({
        path: "favorites",
        populate: { path: "category", select: "name" }, 
      });
    if (!user) return res.status(404).send({ error: "User not found!!" });
    res.send(user.favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllFavorites = async (req, res) => {
  try {
    const users = await User.find()
      .populate({
        path: "favorites",
        populate: { path: "category", select: "name" },
      });
    //all favorites into a single array
    const allFavorites = users.flatMap(user => user.favorites);

    res.status(200).send(allFavorites);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch all favorites" });
  }
};


const updateProfile = async(req, res)=>{
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return res.send({error: "User not found"})
   
    user.fullname = req.body.fullname || user.fullname;
    user.email = req.body.email || user.email;

  if(req.body.password){
    user.password = req.body.password;
  }
  const updatedUser = await user.save();
   
  res.send({
    message: "Profile Updated",
    user: {
      fullname: updatedUser.fullname,
      email: updatedUser.email
    },
  })
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch users" });
  }
};


export { signup, login, logout, getUserFavorite, updateProfile, getAllUsers, getAllFavorites};

