import { email } from "zod";
import User from "../model/user.js"
import createToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

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

const logout = async (req, res) => {
  if (req.user) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? "None" : "Lax",
    });
    res.send({ message: "Logout success!" })
  }
  else {
    res.status(400).send({ error: "You are not logged in!" })
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


const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return res.send({ error: "User not found" })

  user.fullname = req.body.fullname || user.fullname;
  user.email = req.body.email || user.email;

  if (req.body.password) {
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

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: "No user found for provided email!!" })

    const OTP = Math.floor(100000 + Math.random() * 900000);
    const otpExpiration = new Date(Date.now() + 2 * 60 * 1000);

    const hashedOtp = await bcrypt.hash(`${OTP}`, 10);

    await User.findOneAndUpdate({ email }, { otp: hashedOtp, otpExpiresAt: otpExpiration }, { new: true });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      }
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: "Reset Your Password",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px;">We received a request to reset your password. Use the OTP below to proceed:</p>
          <h3 style="background: #f8f8f8; padding: 10px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 2px;">${OTP}</h3>
          <p style="font-size: 16px;">If you didn’t request this, please ignore this email.</p>
          <p style="color: red; font-weight: bold;">⚠️ Do not share this OTP with anyone for security reasons.</p>
          <p style="font-size: 14px; color: #666;">Best regards,</p>
          <p style="font-size: 14px; color: #666;">Recipe-Hub Team</p>
        </div>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "OTP sent successfully!!" })
  } catch (error) {
    res.status(500).send({ message: "Unable to send OTP" });
    console.error("Error sending OTP email:", error);
  }
}

const verifyOTP = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "No user found for provided email" })

    if (user.otpExpiresAt < new Date()) return res.status(400).send({ message: "Otp has expired please try again" });

    const validOtp = await bcrypt.compare(otpCode.toString(), user.otp);

    if (!validOtp) return res.status(400).send({ message: "Invalid Otp Code" });

    await User.findByIdAndUpdate(user._id, { $unset: { otp: 1, otpExpiresAt: 1 } });
    res.status(200).send({ message: "Otp Verification Successful" });
  } catch (error) {
    res.status(500).send({ message: "Failed to Verify Otp" });
    console.error("Error Verifying Otp:", error);
  }
}

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate({ email }, { password: hashedPassword });
    if (!user) return res.status(404).send({ message: "No user found for provided user" });
    res.status(200).send({ message: "Password reset successfully you can login now" });
  } catch (error) {
    res.status(500).send({ message: "Failed to reset the password" });
    console.error("Error Resetting Password", error);
  }
}

export { signup, login, logout, getUserFavorite, updateProfile, getAllUsers, getAllFavorites, sendOTP, verifyOTP, resetPassword };

