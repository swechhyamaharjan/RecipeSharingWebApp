import Recipe from "../model/recipe.js";
import User from "../model/user.js"
import Category from "../model/category.js";

const addRecipe = async (req, res) => {
  try {
    let { title, description, ingredients, instruction, category } = req.body;

    // If strings (from form-data), parse into arrays
    if (typeof ingredients === "string") ingredients = JSON.parse(ingredients);
    if (typeof instruction === "string") instruction = JSON.parse(instruction);

    if (!Array.isArray(ingredients) || !Array.isArray(instruction)) {
      return res.status(400).json({ error: "Ingredients and instruction must be arrays" });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(400).json({ error: "Invalid category ID" });

    const recipe = await Recipe.create({
      ...req.body,
      user: req.user._id,
      title,
      description,
      ingredients,
      instruction,
      image: req.file?.path || "",
      category,
    });

    await User.findByIdAndUpdate(req.user._id, { $push: { recipes: recipe._id } });

    res.json({ message: "Recipe added successfully", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find()
    .populate('user', "fullname email -_id")
    .populate("category", "name description -_id");
  res.send(recipes);
}

const getRecipeById = async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId).populate('user', "fullname email -_id");
  if (!recipe)
    return res.status(404).send({ error: "Recipe not Found!" });
  res.send(recipe);
}
const getMyRecipes = async (req, res) => {
  const myRecipes = await Recipe.find({ user: req.user._id })
    .populate('category', 'name -_id')
    .sort({ createdAt: -1 });
  res.send(myRecipes);
}

const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipeBody = req.body;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }
    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({ error: "You are not allowed to update this recipe!" });
    }
    // If an image changed use it, otherwise keep existing
    const image = req.file ? req.file.path : recipe.image;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        title: recipeBody.title,
        description: recipeBody.description,
        ingredients: JSON.parse(req.body.ingredients),
        instruction: JSON.parse(req.body.instruction),
        category: recipeBody.category,
        image,
      },
      {
        new: true,
        runValidators: true,
      }
    )
    res.send({ message: "Recipe updated successfully", updatedRecipe });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }
    if (recipe.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(404).send({ error: "You are not allowed to delete the recipe." })
    }
    await recipe.deleteOne();
    await User.findByIdAndUpdate(recipe.user, {
      $pull: { recipes: recipe._id }
    });
    res.send({ message: "Recipe deleted successfully", recipeId: recipe._id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const toggleLike = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user._id;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.staus(404).send({ error: "Recipe not found" })
    }
    if (recipe.likes.includes(userId)) { //if already liked
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        { $pull: { likes: userId } }, //unlike
        { new: true },
      );
      await User.findByIdAndUpdate( //update in users
        userId,
        { $pull: { likedRecipes: recipeId } }
      )
      return res.send({ message: "Recipe unliked", likesCount: updatedRecipe.likes.length });
    } else { //not like => like
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        { $push: { likes: userId } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { $push: { likedRecipes: recipeId } }
      )
      return res.send({ message: "Recipe liked", likesCount: updatedRecipe.likes.length });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const toggleFavorite = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user._id;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.staus(404).send({ error: "Recipe not found" })
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ error: "User not found" });
    if (user.favorites.includes(recipeId)) {
      const updatedUserFav = await User.findByIdAndUpdate(
        userId,
        { $pull: { favorites: recipeId } },
        { new: true }
      )
      res.send({ message: "Removed from favorites", favouritesCount: updatedUserFav.favorites.length })
    }
    else {
      const updatedUserFav = await User.findByIdAndUpdate(
        userId,
        { $push: { favorites: recipeId } },
        { new: true }
      )
      res.send({ message: "Added to favorites", favouritesCount: updatedUserFav.favorites.length })
    }
  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }

}

export { addRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, toggleLike, toggleFavorite, getMyRecipes };






