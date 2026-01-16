import { Link } from "react-router";
import { useGetMyRecipesQuery } from "../slices/recipeApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const MyRecipes = () => {
  const {data: recipes, isLoading, error} = useGetMyRecipesQuery();

  if(isLoading) return <Loader />
  if(error) return <Message>{error.message || "Failed to load your recipes"}</Message>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">My Recipes</h2>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">You haven't added any recipes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                <div className="overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"/>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-green-600 transition-colors">
                    {recipe.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-2">
                    Category: <span className="font-medium text-gray-700">{recipe.category?.name}</span>
                  </p>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-3 h-8">
                    {recipe.description}
                  </p>

                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      recipe.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : recipe.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                    {recipe.status}
                  </span>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <Link
                      to={`/recipe/${recipe._id}`}
                      className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors"
                    >
                      View
                    </Link>

                    <Link
                      to={`/edit-recipe/${recipe._id}`}
                      className="text-sm text-gray-600 font-medium hover:text-gray-800 hover:underline transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRecipes