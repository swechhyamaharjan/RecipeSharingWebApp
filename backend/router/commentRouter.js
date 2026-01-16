import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { addComment, deleteComments, getComments } from "../controller/commentController.js";
import validationHandler from "../middlewares/validationHandler.js";
import { commentAddSchema } from "../model/comment.js";
import { getUserFavorite } from "../controller/userController.js";

const router = express.Router();

router.post("/:id", checkAuth, validationHandler(commentAddSchema), addComment);
router.get("/:id", getComments);
router.delete("/:id", checkAuth, deleteComments);

export default router;