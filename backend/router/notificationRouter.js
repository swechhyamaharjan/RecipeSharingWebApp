import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { getMyNotifications, markNotificationRead } from "../controller/notificationController.js";

const router = express.Router();

router.get("/", checkAuth, getMyNotifications);
router.put("/read/:id", markNotificationRead);

export default router;