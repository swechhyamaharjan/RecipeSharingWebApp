import express from "express"
import { signup, login, logout } from "../controller/userController.js";
import checkAuth from "../middlewares/checkAuth.js"
import validationHandler from "../middlewares/validationHandler.js";
import { userAddSchema, userLoginSchema } from "../model/user.js";

 const router = express.Router();

 router.post("/signup", validationHandler(userAddSchema), signup);
 router.post("/login", validationHandler(userLoginSchema), login);
 router.post("/logout", checkAuth, logout);

 export default router;