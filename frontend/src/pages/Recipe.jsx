import React from "react";
import { useParams } from "react-router";
import { useGetRecipeByIdQuery, useToggleFavoriteMutation, useToggleLikeMutation } from "../slices/recipeApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FaHeart, FaBookmark, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useGetRecipeByIdQuery(id);
  const {userInfo} = useSelector((state)=>state.auth);
  const [toggleLike, {isLoading: liking}] = useToggleLikeMutation();
  const [toggleFav, {isLoading: bookmarking}] = useToggleFavoriteMutation();

  if (isLoading) return <Loader />;
  if (error) return <Message>{error.message || "Failed to load recipe"}</Message>;



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
              <button className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-stone-200">
                <FaHeart className="text-red-400 text-lg" />
                <span className="font-semibold text-stone-700">{recipe.likes.length} Likes</span>
              </button>

              <button className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-stone-200">
                <FaBookmark className="text-stone-600 text-lg" />
                <span className="font-semibold text-stone-700">Bookmark</span>
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

          {/* Example review */}
          <div className="bg-gradient-to-br from-stone-50 to-neutral-100 p-6 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  U
                </div>
                <span className="font-semibold text-stone-800">User Name</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full border border-amber-200">
                <FaStar className="text-amber-500" />
                <span className="font-bold text-amber-700">4.5</span>
              </div>
            </div>
            <p className="text-stone-600 leading-relaxed">
              This recipe was amazing! Very easy to follow and delicious.
            </p>
          </div>
        </div>

        {/* ADD COMMENT */}
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-stone-200">
          <h3 className="text-2xl font-bold text-stone-900 mb-6">
            Add a Comment
          </h3>

          <textarea
            rows="4"
            placeholder="Write your comment..."
            className="w-full border-2 border-stone-200 rounded-2xl p-5 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all text-stone-700 placeholder:text-stone-400"
          ></textarea>

          <div className="flex items-center justify-between mt-6">
            <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Submit
            </button>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 hover:scale-105 transition-all font-medium border border-red-200">
                <FaHeart /> Like
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-stone-100 text-stone-700 hover:bg-stone-200 hover:scale-105 transition-all font-medium border border-stone-300">
                <FaBookmark /> Bookmark
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Recipe;