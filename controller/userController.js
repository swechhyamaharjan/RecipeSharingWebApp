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
      fullname: newUser.fullname,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    }
  });
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ error: "User doesn't exits of this email!" })
  if (await user.matchedPassword(password)) {
    createToken(res, user._id)
    res.send({
      message: "Login success", user: {
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  } else {
    res.status(400).send({ error: "Password doesn't match" })
  }
}

// const logout = async(req, res) => {
//   if(req.user){
//     res.clearCookie('jwt');
//     res.send({message: "Logout success!"})
//   }
//   else{
//     res.status(400).send({error: "You are not logged in!"})
//   }
// }
export { signup, login};

