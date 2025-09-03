import Recipe from "../model/recipe.js";
import User from "../model/user.js"

const addRecipe = async(req, res)=>{
  try{
  const {title, description, ingredients, instruction, image} = req.body;
  const recipe = await Recipe.create({
    user: req.user_id,
    title,
    description,
    ingredients,
    instruction,
    image
  })
  await User.findByIdAndUpdate(req.user._id, {
    $push: { recipes: recipe._id }
  })

  res.send({message: "Recipe added successfully", Recipe})
}
catch(error){
  res.status(500).send({error: error.message});
}
}
export {addRecipe}

