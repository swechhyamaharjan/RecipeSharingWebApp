import { Link } from "react-router";
import { useGetMyRecipesQuery } from "../slices/recipeApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const MyRecipes = () => {
  const {data: recipes, isLoading, error} = useGetMyRecipesQuery();

  if(isLoading) return <Loader />
  if(error) return <Message>{error.message || "Failed to load your recipes"}</Message>

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Recipes</h2>

      {recipes.length === 0 ? (
        <p className="text-gray-500">You haven’t added any recipes yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe._id}  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover"/>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {recipe.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Category: {recipe.category?.name}
                </p>

                <p className="text-sm mt-2 line-clamp-2 text-gray-600">
                  {recipe.description}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
                    recipe.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : recipe.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                  {recipe.status}
                </span>

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/recipe/${recipe._id}`}
                    className="text-green-600 font-medium hover:underline"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit-recipe/${recipe._id}`}
                    className="text-sm text-gray-500 hover:text-gray-700"
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
  );
}

export default MyRecipes