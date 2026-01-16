import Comment from "../model/comment.js";
import Recipe from "../model/recipe.js";
import User from "../model/user.js";

const addComment = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { text, rating } = req.body;

      if (!text || !rating) {
      return res.status(400).send({ error: "Text and rating are required" });
    }

    const comment = await Comment.create({
      user: req.user._id,
      recipe: recipeId,
      text,
      rating,
    })

    const recipe = await Recipe.findById(recipeId);

    recipe.numReviews += 1;
    recipe.averageRating = (recipe.averageRating * (recipe.numReviews - 1) + rating) / recipe.numReviews;

    await recipe.save();

    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "fullname email"
    );

    res.status(201).send({
      message: "Comment added successfully",
      comment: populatedComment,
    });
  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const getComments = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const comment = await Comment.find({ recipe: recipeId }).populate("user", "fullname email")
    res.send(comment);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const deleteComments = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    // Check if the logged-in user is the owner
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "Not authorized to delete this comment" });
    }
    await comment.deleteOne();

    // Remove comment reference from the Recipe too
    await Recipe.findByIdAndUpdate(comment.recipe, {
      $pull: { comment: comment._id }
    });

    res.status(200).json({ message: "Comment deleted successfully", deletedCommentId: commentId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


export { addComment, getComments, deleteComments };