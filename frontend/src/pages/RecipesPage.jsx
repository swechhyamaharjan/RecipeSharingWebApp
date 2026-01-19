import { useState, useEffect } from "react";
import { useGetRecipesQuery } from "../slices/recipeApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useLocation } from "react-router";
import { Heart, Star, ChefHat } from "lucide-react";

const RecipePage = () => {
   const location = useLocation();
  
  const params = new URLSearchParams(location.search); //?keyword=faluda = query string

  const urlKeyword = params.get("keyword") || "";
  
  const [keyword, setKeyword] = useState(urlKeyword);

  // Sync local state with URL changes
  useEffect(() => {
    setKeyword(urlKeyword);
  }, [urlKeyword]);

  const { data: recipes, isLoading, error } = useGetRecipesQuery(keyword);

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error.message || "Something went wrong!"}</Message>;

  return (
   <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen">
  {/* Header */}
  <div className="bg-white sticky top-0 z-20 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3">
        <ChefHat className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-900">All Recipes</h1>
      </div>
      <p className="text-gray-600 mt-2">
            {keyword
              ? recipes.length
                ? `Found ${recipes.length} recipes`
                : "No recipes found"
              : "Discover delicious recipes crafted with love"}
          </p>
    </div>
  </div>

  {/* Recipe Grid */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Link
          key={recipe._id}
          to={`/recipe/${recipe._id}`}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-100 hover:border-green-300 transform hover:-translate-y-1"
        >
          {/* Recipe Image */}
          {recipe.image && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-5">
            {/* Title & Category */}
            <div className="mb-3">
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {recipe.title}
              </h2>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                {recipe.category?.name || "Uncategorized"}
              </span>
            </div>

            {/* Description */}
            <div className="h-8 mb-4">
              {recipe.description && (
                <p className="text-gray-600 text-sm line-clamp-3">
                  {recipe.description}
                </p>
              )}
            </div>

            {/* Ingredients & Instructions */}
            {recipe.ingredients?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                  Ingredients ({recipe.ingredients.length})
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 ml-3">
                  {recipe.ingredients.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <li className="text-green-600 font-medium">
                      +{recipe.ingredients.length - 3} more...
                    </li>
                  )}
                </ul>
              </div>
            )}

            {recipe.instruction?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                  Instructions ({recipe.instruction.length} steps)
                </h3>
              </div>
            )}

            {/* Likes & Rating */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 text-gray-700">
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                <span className="text-sm font-medium">
                  {recipe.likes?.length || 0}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-700">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {recipe.averageRating?.toFixed(1) || "0.0"}
                </span>
              </div>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                View Recipe
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>

  );
};

export default RecipePage;