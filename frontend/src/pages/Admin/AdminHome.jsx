import { FaUsers, FaUtensils, FaTags, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetRecipesQuery } from "../../slices/recipeApiSlice";
import { useGetCategoriesQuery } from "../../slices/categoryApiSlice";
import { useGetAllUsersQuery, useAllfavoritesQuery } from "../../slices/userapiSlice";


const AdminHome = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: recipes = [] } = useGetRecipesQuery();
  const { data: users = [] } = useGetAllUsersQuery();
  const { data: favorites = [] } = useAllfavoritesQuery();

  return (
    <div className="p-6 min-h-screen">
       <div className="max-w-full mx-auto p-6 lg:p-8">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-xl text-zinc-400 mt-8">
          Welcome, <span className="text-emerald-400 font-medium">{userInfo?.fullname}</span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Users */}
        <div className="bg-white rounded-xl shadow-sm p-5 border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h2 className="text-2xl font-bold text-gray-800">{users.length}</h2>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <FaUsers size={22} />
            </div>
          </div>
        </div>

        {/* Recipes */}
        <div className="bg-white rounded-xl shadow-sm p-5 border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Recipes</p>
              <h2 className="text-2xl font-bold text-gray-800">{recipes.length}</h2>
            </div>
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
              <FaUtensils size={22} />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl shadow-sm p-5 border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Categories</p>
              <h2 className="text-2xl font-bold text-gray-800">{categories.length}</h2>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <FaTags size={22} />
            </div>
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-white rounded-xl shadow-sm p-5 border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Favorites</p>
              <h2 className="text-2xl font-bold text-gray-800">{favorites.length}</h2>
            </div>
            <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
              <FaHeart size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Users
          </h3>
          <ul className="space-y-3">
            {users
              .slice(-5)
              .reverse()
              .map((user) => (
                <li key={user._id}
                  className="flex items-center justify-between text-sm text-gray-700">
                  <span>{user.fullname}</span>
                  <span className="text-xs text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Recent Recipes */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recently Added Recipes
          </h3>
          <ul className="space-y-3">
            {recipes
              .slice(-5)
              .reverse()
              .map((recipe) => (
                <li key={recipe._id}
                  className="flex items-center justify-between text-sm text-gray-700">
                  <span>{recipe.title}</span>
                  <span className="text-gray-500 text-xs">
                    By: {recipe.user?.fullname || "Unknown"}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminHome;
