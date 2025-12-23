import Comment from "../model/comment.js";
import Recipe from "../model/recipe.js";
import User from "../model/user.js";

const addComment = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { text } = req.body;
    const comment = await Comment.create({
      user: req.user._id,
      recipe: recipeId,
      text,
    })
    await Recipe.findByIdAndUpdate(recipeId, {
      $push: { comment: comment._id }
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
    if (!comment.user) {
      return res.status(400).json({ message: "Comment has no associated user" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }
    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export { addComment, getComments, deleteComments };