import express from "express"
import { signup, login, logout, getUserFavorite, updateProfile, getAllUsers, getAllFavorites, sendOTP, verifyOTP } from "../controller/userController.js";
import checkAuth from "../middlewares/checkAuth.js"
import checkAdmin from "../middlewares/checkAdmin.js"
import validationHandler from "../middlewares/validationHandler.js";
import { userAddSchema, userLoginSchema } from "../model/user.js";

const router = express.Router();

router.post("/signup", validationHandler(userAddSchema), signup);
router.post("/login", validationHandler(userLoginSchema), login);
router.post("/sendOtp", sendOTP);
router.post("/verifyOtp", verifyOTP);
router.get("/", checkAuth, checkAdmin, getAllUsers);
router.put("/updateProfile", checkAuth, updateProfile);
router.post("/logout", checkAuth, logout);
router.get("/favorites", checkAuth, getUserFavorite);
router.get("/allFavorites", checkAuth, checkAdmin, getAllFavorites);

export default router;