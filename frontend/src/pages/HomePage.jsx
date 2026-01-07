import React from 'react'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { FaHeart, FaStar } from "react-icons/fa";
import { useGetCategoriesQuery } from '../slices/categoryApiSlice'
import { useGetRecipesQuery } from '../slices/recipeApiSlice';

const HomePage = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const {data: recipes, isLoading: recipeLoading, error: reciperr} = useGetRecipesQuery();

  if (isLoading) return <Loader />;
  if (error) return <Message>{error.message || "Failed to load categories"}</Message>;

  if(recipeLoading) return <Loader />;
  if(reciperr) return <Message>{error.message || "Failed to load top recipes"}</Message>

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      <h2 className='text-3xl font-bold text-gray-800 mb-8'>Categories</h2>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center'>
        {categories?.map((category) => (
          <div key={category._id}
            className='flex flex-col items-center cursor-pointer group'>
            <div className='h-24 w-24 rounded-full bg-green-100 flex items-center justify-center shadow-md group-hover:bg-green-200 transition'>
              {
                category.image ? (
                  <img src={category.image}
                    alt={category.name}
                    className='w-full h-full object-cover rounded-full' />
                ) : (
                  <span className="text-green-600 font-semibold text-lg">
                    {category.name.charAt(0)}
                  </span>
                )
              }
            </div>
            <p className='mt-3 text-gray-700 font-medium text-center'>{category.name}</p>
          </div>
        ))}
      </div>

      {/* top recipes */}
      <h2 className='text-3xl font-bold text-gray-800 mb-8 mt-8'>Top Recipes</h2>
       <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {recipes?.slice(0,5).map((recipe)=>(
          <div key={recipe._id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer'> 
            <img src={recipe.image}
            alt={recipe.title}
            className='w-full h-50 object-contain'/>

          <div className='p-4'>
            <h3 className='text-lg font-bold text-gray-800 truncate'> {recipe.title}</h3>
            <div className='flex items-center justify-between mt-3 text-sm'> 
             <div className='flex items-center gap-1 text-yellow-500'>
              <FaStar />
             <span className='text-gray-700'>{recipe.averageRating || 0}</span>
             </div>
             <div className='flex items-center gap-1 text-red-500'>
              <FaHeart />
             <span className='text-gray-700'>{recipe.likes.length || 0 }</span>
             </div>
            </div>
             </div>
          </div>
        ))}
       </div>
    </div>

  )
}

export default HomePage