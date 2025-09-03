import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { addRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from "../controller/recipeController.js";

const router = express.Router();

router.post("/", checkAuth, addRecipe);
router.get("/", checkAuth, getAllRecipes);
router.get("/:id", checkAuth, getRecipeById);
router.put("/:id", checkAuth, updateRecipe);
router.delete("/:id", checkAuth, deleteRecipe);

export default router;