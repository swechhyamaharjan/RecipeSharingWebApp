import jwt from "jsonwebtoken";
import User from "../model/user.js";

const checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "You are not an authorised user!!" });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    req.user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  } catch (error) {
    return res.status(401).json({ error: "Invalid token!" });
  }
  next();
};

export default checkAuth;
