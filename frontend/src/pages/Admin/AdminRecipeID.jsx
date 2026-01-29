import React from 'react'
import { useParams, useNavigate } from 'react-router'
import { useGetRecipeByIdQuery } from '../../slices/recipeApiSlice'
import { useUpdateRecipeStatusMutation } from '../../slices/recipeApiSlice';
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { FaCheck, FaTimes, FaUser, FaClock, FaUtensils, FaListOl, FaAngleLeft } from 'react-icons/fa'
import { toast } from 'react-toastify';

const AdminRecipeID = () => {
  const { id } = useParams()
  const { data: recipe = [], isLoading, error } = useGetRecipeByIdQuery(id)
  const [updateRecipeStatus] = useUpdateRecipeStatusMutation();
  const navigate = useNavigate();

  const statusHandler = async(id, status) => {
    try{
    await updateRecipeStatus({id, status}).unwrap();
    toast.success(`Recipe ${status} successfully!!!`)
    }
    catch(error){
      toast.error(error?.data?.error || "Action Failed!!")
    }

  }

  if (isLoading) return <Loader />
  if (error) return <Message>{error.message || 'Failed to load recipe'}</Message>

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8'>
        <FaAngleLeft className='text-2xl cursor-pointer border-2 rounded-md'
        onClick={()=>navigate("/admin/recipes")}
        />
        <h1 className='text-3xl font-bold text-gray-900'>Recipe Details</h1>
        </div>

        {/* Main Content Card */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6'>
          {/* Top Section - Image & Info */}
          <div className='grid md:grid-cols-2 gap-6 p-6'>
            {/* Image */}
            <div className='overflow-hidden rounded-lg'>
              <img 
                src={recipe.image}
                alt={recipe.title}
                className='w-full h-80 object-cover'
              />
            </div>

            {/* Recipe Info */}
            <div className='flex flex-col justify-between'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                  {recipe.title}
                </h2>
                <p className='text-gray-600 mb-4 leading-relaxed'>
                  {recipe.description}
                </p>

                {/* Status Badge */}
                <span
                  className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-full ${
                    recipe.status === 'approved'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : recipe.status === 'rejected'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}
                >
                  {recipe.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>

              {/* Meta Info */}
              <div className='flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-200'>
                <div className='flex items-center gap-2 text-gray-600'>
                  <FaUser className='text-gray-400' />
                  <span className='font-medium'>{recipe.user?.fullname || 'Unknown User'}</span>
                </div>

                <div className='flex items-center gap-2 text-gray-600'>
                  <FaClock className='text-gray-400' />
                  <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Ingredients & Instructions */}
          <div className='grid md:grid-cols-2 gap-6 p-6 bg-gray-50 border-t border-gray-200'>
            {/* Ingredients */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <FaUtensils className='text-blue-600' />
                <h3 className='text-lg font-bold text-gray-900'>
                  Ingredients
                </h3>
              </div>
              <ul className='space-y-2'>
                {recipe.ingredients?.map((item, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-700'>
                    <span className='text-blue-600 mt-1.5'>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <FaListOl className='text-blue-600' />
                <h3 className='text-lg font-bold text-gray-900'>
                  Instructions
                </h3>
              </div>
              <ol className='space-y-3'>
                {recipe.instruction?.map((item, index) => (
                  <li key={index} className='flex gap-3 text-gray-700'>
                    <span className='flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold'>
                      {index + 1}
                    </span>
                    <span className='pt-0.5'>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4'>
          <button
            disabled={recipe.status === 'approved'}
            onClick={()=>{statusHandler(recipe._id, "approved")}}
            className='flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm'
          >
            <FaCheck />
            Approve Recipe
          </button>

          <button
            disabled={recipe.status === 'rejected'}
            onClick={()=>{statusHandler(recipe._id, "rejected")}}
            className='flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm'
          >
            <FaTimes />
            Reject Recipe
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminRecipeID
