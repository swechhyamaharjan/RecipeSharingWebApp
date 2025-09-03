import Recipe from "../model/recipe.js";
import User from "../model/user.js"

const addRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instruction, image } = req.body;
    const recipe = await Recipe.create({
      user: req.user._id,
      title,
      description,
      ingredients,
      instruction,
      image
    })
    await User.findByIdAndUpdate(req.user._id, {
      $push: { recipes: recipe._id }
    })

    res.send({ message: "Recipe added successfully", Recipe })
  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find().populate('user', "fullname email -_id");
  res.send(recipes);
}

const getRecipeById = async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId).populate('user', "fullname email -_id");
  if (!recipe)
    return res.status(404).send({ error: "Recipe not Found!" });
  res.send(recipe);
}

const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipeBody = req.body;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }
    if (recipe.user.toString()!== req.user._id.toString()){
     return res.status(403).send({ error: "You are not allowed to update this recipe!"});
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      recipeBody,
      { new: true }
    )
    res.send({message: "Recipe updated successfully", updatedRecipe});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const deleteRecipe = async(req, res)=>{
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if(!recipe){
      return res.status(404).send({error: "Recipe not found"});
    }
    if(recipe.user.toString()!==req.user._id.toString() && !req.user.isAdmin){
      return res.status(404).send({error: "You are not allowed to delete the recipe."})
    }
    await recipe.deleteOne();
    res.send({ message: "Recipe deleted successfully", recipeId: recipe._id });
  } catch (error) {
    res.status(500).send({error: error.message});
  }
}
export { addRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };






