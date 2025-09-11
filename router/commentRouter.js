import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { addComment } from "../controller/commentController.js";

const router = express.Router();

router.post("/:id", checkAuth, addComment);

export default router;