import Comment from "../model/comment.js";
import Recipe from "../model/recipe.js";
import User from "../model/user.js";

const addComment = async(req, res)=>{
  try{
  const recipeId = req.params.id;
  const { text } = req.body;
  const comment = await Comment.create({
    user: req.user._id,
    Recipe: recipeId,
    text,
  })
  await Recipe.findByIdAndUpdate(recipeId, {
    $push: {comment: comment._id}
  })
   const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "fullname email -_id"
    );
 res.send({
      message: "Comment added successfully",
      comment: populatedComment,
    });
}
catch(error){
  res.status(500).send({error: error.message});
}
}

export {addComment};