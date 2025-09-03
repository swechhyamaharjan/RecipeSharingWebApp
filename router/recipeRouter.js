import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { addRecipe } from "../controller/recipeController.js";

const router = express.Router();

router.post("/", checkAuth, addRecipe)

export default router;