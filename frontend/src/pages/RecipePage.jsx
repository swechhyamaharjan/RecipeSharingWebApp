import React from "react";
import { useGetRecipesQuery } from "../slices/recipeApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RecipePage = () => {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();

  if (isLoading) return <Loader />;

  if (error) return <Message>{error.message || "Something went wrong!"}</Message>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">All Recipes</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recipes?.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            
            {/* Recipe Image */}
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-5">
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800">{recipe.title}</h2>

              {/* Category & Status */}
              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                <span>Category: {recipe.category?.name || "N/A"}</span>
                <span className={`capitalize ${recipe.status === "approved" ? "text-green-500" : recipe.status === "pending" ? "text-yellow-500" : "text-red-500"}`}>
                  {recipe.status}
                </span>
              </div>

              {/* Description */}
              {recipe.description && (
                <p className="mt-3 text-gray-600">{recipe.description}</p>
              )}

              {/* Ingredients */}
              {recipe.ingredients?.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-700">Ingredients:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {recipe.ingredients.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructions */}
              {recipe.instruction?.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-700">Instructions:</h3>
                  <ol className="list-decimal list-inside text-gray-600">
                    {recipe.instruction.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Likes & Rating */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{recipe.likes?.length || 0} Likes</span>
                <span className="text-sm text-yellow-500">⭐ {recipe.averageRating?.toFixed(1)}</span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
