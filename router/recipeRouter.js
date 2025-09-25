import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { addRecipe, deleteRecipe, getAllRecipes, getRecipeById, toggleFavorite, toggleLike, updateRecipe } from "../controller/recipeController.js";
import validationHandler from "../middlewares/validationHandler.js";
import { recipeAddSchema, recipeUpdateSchema } from "../model/recipe.js";

const router = express.Router();

router.post("/", checkAuth, validationHandler(recipeAddSchema), addRecipe);
router.get("/", checkAuth, getAllRecipes);
router.get("/:id", checkAuth, getRecipeById);
router.put("/:id", checkAuth, validationHandler(recipeUpdateSchema), updateRecipe);
router.delete("/:id", checkAuth, deleteRecipe);
router.post("/:id/like", checkAuth, toggleLike);
router.post("/:id/fav", checkAuth, toggleFavorite);

export default router;