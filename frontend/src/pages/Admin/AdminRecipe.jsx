import React, { useState } from 'react'
import { useGetRecipesQuery } from '../../slices/recipeApiSlice'
import { useUpdateRecipeStatusMutation } from '../../slices/recipeApiSlice';
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaCheck, FaTimes, FaUser, FaClock, FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const AdminRecipe = () => {
  const navigate = useNavigate();
  const { data: recipes = [], isLoading, error } = useGetRecipesQuery();
  const [updateRecipeStatus] = useUpdateRecipeStatusMutation();
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  const filteredRecipes = recipes.filter(recipe => {
    if (filter === 'all') return true;
    return recipe.status === filter;
  });

  const statusCounts = {
    all: recipes.length,
    pending: recipes.filter(r => r.status === 'pending').length,
    approved: recipes.filter(r => r.status === 'approved').length,
    rejected: recipes.filter(r => r.status === 'rejected').length,
  };

  const statusHandler = async(id, status) => {
    try {
      await updateRecipeStatus({id, status}).unwrap();
      toast.success(`Recipe ${status} successfully!!!`)
    } catch (error) {
      toast.error(error?.data?.error|| "Action failed!!")
    }
  }

  if (isLoading) return <Loader />
  if (error) return <Message>{error.message || "Failed to load recipes"}</Message>

  return (
    <div className='min-h-screen p-6 bg-gray-50'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Recipe Moderation
          </h1>
          <p className='text-gray-600'>Review and manage submitted recipes</p>
        </div>

        {/* Filter Tabs */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-2 mb-8 inline-flex gap-2'>
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all capitalize ${
                filter === status
                  ? 'bg-green-400 text-white shadow-md shadow-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status}
              <span className='ml-2 text-xs opacity-75'>
                ({statusCounts[status]})
              </span>
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className='group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200'
            >
              {/* Image Container with Overlay */}
              <div className='relative h-56 overflow-hidden bg-gray-400'>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className='h-full w-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
                
                {/* Status Badge - Floating */}
                <div className='absolute top-4 right-4'>
                  <span
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm ${
                      recipe.status === "approved"
                        ? "bg-green-400 text-white"
                        : recipe.status === "rejected"
                        ? "bg-red-400 text-white"
                        : "bg-yellow-400 text-yellow-900"
                    }`}
                  >
                    {recipe.status || "pending"}
                  </span>
                </div>

                {/* View Button Overlay */}
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                  <button onClick={() => navigate(`recipe/${recipe._id}`)}
                   className='bg-white text-gray-900 px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                    <FaEye />
                    View Details
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className='p-6'>
                <h2 className='text-xl font-bold text-gray-900 mb-2 line-clamp-1'>
                  {recipe.title}
                </h2>

                <p className='text-sm text-gray-600 mb-4 leading-relaxed h-10 overflow-hidden'>
                  {recipe.description.length > 80 
                    ? recipe.description.substring(0, 80) + '...' 
                    : recipe.description}
                </p>

                {/* Meta Info */}
                <div className='flex items-center gap-4 mb-5 pb-5 border-b border-gray-100'>
                  <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <div className='w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-semibold'>
                      {recipe.user?.fullname?.charAt(0) || "U"}
                    </div>
                    <span className='font-medium'>{recipe.user?.fullname || "Unknown User"}</span>
                  </div>
                  
                  <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                    <FaClock className='text-gray-400' />
                    <span>2 days ago</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3'>
                  <button
                    disabled={recipe.status === 'approved'}
                    onClick={()=>{statusHandler(recipe._id, "approved")}}
                    className='flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm'
                  >
                    <FaCheck className='text-sm' />
                    Approve
                  </button>

                  <button
                    disabled={recipe.status === 'rejected'}
                    onClick={()=>{statusHandler(recipe._id, "rejected")}}
                    className='flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm'
                  >
                    <FaTimes className='text-sm' />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className='text-center py-20'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4'>
              <FaClock className='text-3xl text-gray-400' />
            </div>
            <p className='text-xl font-medium text-gray-900 mb-2'>
              No recipes found
            </p>
            <p className='text-gray-500'>
              {filter === 'all' 
                ? 'No recipes have been submitted yet' 
                : `No ${filter} recipes at the moment`}
            </p>
          </div>
        )}
      </div>
  )
}

export default AdminRecipe;