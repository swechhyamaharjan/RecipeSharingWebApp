import React, { useState } from "react";
import { useParams } from "react-router";
import { useGetRecipeByIdQuery, useToggleFavoriteMutation, useToggleLikeMutation } from "../slices/recipeApiSlice";
import { useGetCommentsQuery, useAddCommentMutation, useDeleteCommentMutation} from "../slices/commentApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FaHeart, FaBookmark, FaStar, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Recipe = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: recipe, isLoading, error } = useGetRecipeByIdQuery(id);
  const { data: comments, isLoading: commentLoading, error: commentErr } = useGetCommentsQuery(id);
  const [addComment, { isLoading: addingComment }] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [comment, setComment] = useState("");
  const [toggleLike, { isLoading: liking }] = useToggleLikeMutation();
  const [toggleFav, { isLoading: bookmarking }] = useToggleFavoriteMutation();

  if (isLoading) return <Loader />;
  if (error) return <Message>{error.message || "Failed to load recipe"}</Message>;

  const isLiked = recipe?.likes?.includes(userInfo?._id)
  const isBookmarked = recipe?.favorites?.includes(userInfo?._id)


  const handleLike = async () => {
    if (!userInfo) {
      toast.error("Please signin to like this recipe!!")
      return;
    }
    try {
      const res = await toggleLike(id).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.error || err?.error)
    }
  }

  const handleFavorite = async () => {
    if (!userInfo) {
      toast.error("Please signin to bookmark this recipe!!")
      return;
    }
    try {
      const res = await toggleFav(id).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.error || err?.error)
    }
  }

  const handleAddComment = async () => {
    if (!comment.trim()) return; // ignore empty
    try {
      const res = await addComment({id, text: comment}).unwrap();
      toast.success(res.message);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")){
      try {
        const res = await deleteComment(commentId).unwrap();
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          {/* Image */}
          <div className="group">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-[400px] object-cover rounded-3xl shadow-xl shadow-stone-300/40 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-stone-400/40"
            />
          </div>

          {/* Right: Title + Actions */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-stone-900 mb-6 leading-tight">
              {recipe.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-amber-50 px-5 py-3 rounded-2xl border border-amber-200">
                <FaStar className="text-amber-500 text-xl" />
                <span className="text-stone-800 font-bold text-xl">
                  {recipe.averageRating.toFixed(1)}
                </span>
                <span className="text-stone-500 text-sm">/ 5</span>
              </div>
            </div>

            {/* Like & Bookmark */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={handleLike}
                disabled={liking}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 
                ${isLiked
                    ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-400 shadow-red-200"
                    : "bg-white border-stone-200 hover:border-red-300"
                  }`}
              >
                <FaHeart className={`text-xl transition-all duration-300 ${isLiked ? "text-red-500 animate-pulse" : "text-stone-400"}`} />
                <span className={`font-semibold ${isLiked ? "text-red-600" : "text-stone-600"}`}>
                  {recipe.likes.length} {recipe.likes.length === 1 ? "Like" : "Likes"}
                </span>
              </button>

              <button
                onClick={handleFavorite}
                disabled={bookmarking}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border-2
                ${isBookmarked
                    ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-400 shadow-emerald-200"
                    : "bg-white border-stone-200 hover:border-emerald-300"
                  }`}
              >
                <FaBookmark className={`text-xl transition-all duration-300 ${isBookmarked ? "text-emerald-600 scale-110" : "text-stone-400"}`} />
                <span className={`font-semibold ${isBookmarked ? "text-emerald-700" : "text-stone-600"}`}>
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </span>
              </button>
            </div>

            {/* Description */}
            {recipe.description && (
              <p className="text-lg text-stone-600 leading-relaxed">
                {recipe.description}
              </p>
            )}
          </div>
        </div>

        {/* INGREDIENTS & INSTRUCTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          {/* Ingredients */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🥗</span>
              </div>
              <h2 className="text-2xl font-bold text-stone-900">
                Ingredients
              </h2>
            </div>
            <ul className="space-y-3">
              {recipe.ingredients.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-stone-700 group">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">👨‍🍳</span>
              </div>
              <h2 className="text-2xl font-bold text-stone-900">
                Instructions
              </h2>
            </div>
            <ol className="space-y-4">
              {recipe.instruction.map((step, index) => (
                <li key={index} className="flex gap-4 text-stone-700 group">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-200 rounded-full flex items-center justify-center font-bold text-amber-700 text-sm group-hover:scale-110 transition-transform">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* RATINGS & REVIEWS */}
        <div className="bg-white rounded-3xl p-10 shadow-lg mb-8 border border-stone-200">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            Ratings & Reviews
          </h2>

          {/* Comments */}
          <div className="space-y-6">
            {commentLoading ? (
              <Loader />
            ) : commentErr ? (
              <Message>{commentErr.message || "Error loading comments"}</Message>
            ) : comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="bg-gradient-to-br from-stone-50 to-neutral-100 p-6 rounded-2xl border border-stone-200 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {comment.user.fullname[0].toUpperCase()}
                      </div>
                      <div>
                        <span className="font-semibold text-stone-800 block">
                          {comment.user.fullname}
                        </span>
                        <span className="text-xs text-stone-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full border border-amber-200">
                      <FaStar className="text-amber-500" />
                      <span className="font-bold text-amber-700">4.5</span>
                    </div>
                  </div>
                  <p className="text-stone-600 leading-relaxed mb-4">{comment.text}</p>
                  
                  {/* Show delete button only if current user owns the comment */}
                  {userInfo && comment.user._id === userInfo._id && (
                    <div className="flex justify-end pt-2 border-t border-stone-200">
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-105 font-medium text-sm"
                        title="Delete comment"
                      >
                        <FaTrash className="text-sm" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <Message variant="info">No comments yet. Be the first to comment!</Message>
            )}
          </div>
        </div>

        {/* ADD COMMENT */}
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-stone-200">
          <h3 className="text-2xl font-bold text-stone-900 mb-6">
            Add a Comment
          </h3>

          <textarea
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            rows="4"
            placeholder="Write your comment..."
            className="w-full border-2 border-stone-200 rounded-2xl p-5 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all text-stone-700 placeholder:text-stone-400"
          ></textarea>

          <div className="flex items-center justify-between mt-6">
            <button 
            onClick={handleAddComment} 
            disabled={addingComment}
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Submit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Recipe;