import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { getMyNotifications } from "../controller/notificationController.js";

const router = express.Router();

router.get("/", checkAuth, getMyNotifications);

export default router;