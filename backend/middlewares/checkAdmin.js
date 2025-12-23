import User from "../model/user.js";

const checkadmin = async(req, res, next)=>{
  const isAdmin = req.user.isAdmin;
  if(isAdmin){
    next();
  }
  else{
    res.status(403).send({error: "You aren't allowed to perform this operation"});
  }
}
export default checkadmin;