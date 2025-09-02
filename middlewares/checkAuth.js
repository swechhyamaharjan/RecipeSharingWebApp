import jwt from "jsonwebtoken";
import User from "../model/user.js"

const checkAuth = async(req, res, next)=>{
  const token = req.cookies.jwt;
  if(!token){
    res.status(401).send({error: "You are not authorised user!"})
  }
  else{
    try {
      const{_id} = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.find(_id);
      req.user = {
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin
      };
      console.log(req.user);
    } catch (error) {
      res.status(400).send({error: error.message});
    }
  }
  next();
}
export default checkAuth;