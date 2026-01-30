import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { addRecipe, deleteRecipe, getAllRecipes, getAllRecipesAdmin, getMyRecipes, getRecipeById, toggleFavorite, toggleLike, updateRecipe, updateRecipeStatus } from "../controller/recipeController.js";
import validationHandler from "../middlewares/validationHandler.js";
import { recipeAddSchema, recipeUpdateSchema } from "../model/recipe.js";
import { upload } from "./uploadRouter.js";


const router = express.Router();

router.post("/", checkAuth, upload.single("image"), validationHandler(recipeAddSchema), addRecipe);
router.get("/", getAllRecipes);
router.get("/admin", getAllRecipesAdmin);
router.get('/myRecipe', checkAuth, getMyRecipes);
router.put("/:id/status", checkAuth, checkAuth, updateRecipeStatus);
router.get("/:id", getRecipeById);
router.put("/:id", checkAuth, upload.single("image"), validationHandler(recipeUpdateSchema), updateRecipe);
router.delete("/:id", checkAuth, deleteRecipe);
router.post("/:id/like", checkAuth, toggleLike);
router.post("/:id/fav", checkAuth, toggleFavorite);

export default router;