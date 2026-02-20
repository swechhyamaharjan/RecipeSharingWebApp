import React from 'react'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { FaHeart, FaStar } from "react-icons/fa";
import { useGetCategoriesQuery } from '../slices/categoryApiSlice'
import { useGetRecipesQuery } from '../slices/recipeApiSlice';
import { Link } from 'react-router';

const HomePage = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const {data: recipes, isLoading: recipeLoading, error: reciperr} = useGetRecipesQuery();

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error.message || "Failed to load categories"}</Message>;
  if(recipeLoading) return <Loader />;
  if(reciperr) return <Message variant="danger">{error.message || "Failed to load top recipes"}</Message>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories?.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-4 flex flex-col items-center">
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-20 h-20 object-cover rounded-full mb-3"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-green-300 flex items-center justify-center text-white text-2xl font-bold mb-3">
                      {category.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-800 text-center text-sm">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recipes Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {recipes?.slice(0,5).map((recipe)=>(
              <Link
                key={recipe._id}
                to={`/recipe/${recipe._id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded shadow">
                      <FaStar className="text-yellow-500 text-sm" />
                      <span className="text-sm font-semibold">{(recipe.averageRating).toFixed(2) || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded shadow">
                      <FaHeart className="text-red-500 text-sm" />
                      <span className="text-sm font-semibold">{recipe.likes.length || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                    {recipe.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Recipes Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse All Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe)=>(
              <Link
                key={recipe._id}
                to={`/recipe/${recipe._id}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              >
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 h-10 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="text-sm font-semibold text-gray-700">{(recipe.averageRating).toFixed(2) || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaHeart className="text-red-500" />
                      <span className="text-sm font-semibold text-gray-700">{recipe.likes.length || 0}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage