import React, { useState } from 'react'
import { useAddCategoryMutation } from '../../slices/categoryApiSlice'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddCategory = () => {
  const [addCategory, {isLoading}] = useAddCategoryMutation();
  const navigate = useNavigate();
  
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    image: null
  });
  
  const handleChange = async(e)=>{
    const {name, value, files} = e.target;

    if(name === "image"){
      setFormdata({...formdata, image: files[0]});
    }else{
      setFormdata({...formdata, [name]: value})
    }
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formdata.name);
      data.append("description", formdata.description);
      data.append("image", formdata.image);

      await addCategory(data).unwrap();
      toast.success("Category added successfully!!")
      navigate("/admin/category");
    } catch (error) {
      toast.error(error?.data?.error || "Failed to add category!!")
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-2'>
            Add New Category
          </h2>
          <p className='text-gray-600'>
            Create a new category to organize your products
          </p>
        </div>

        {/* Form Card */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
          <form className="p-8 space-y-6" onSubmit={submitHandler}>
            {/* Category Name */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Category Name
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Description
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <textarea
                name="description"
                placeholder="Provide a brief description of this category..."
                rows="4"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Category Image
              </label>
              <div className='border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-emerald-400 transition-colors'>
                <div className='flex flex-col items-center justify-center'>
                  <label className='cursor-pointer'>
                    <span className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-block font-medium'>
                      Choose File
                    </span>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className='hidden'
                      onChange={handleChange}
                    />
                  </label>
                  <p className='text-sm text-gray-500 mt-2'>PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className='border-t border-gray-200 pt-6'>
              {/* Action Buttons */}
              <div className='flex gap-4'>
                <button
                  type="button"
                  className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all'
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className='flex-1 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                >
                  {isLoading ? (
                    <span className='flex items-center justify-center gap-2'>
                      Adding...
                    </span>
                  ) : (
                    <span className='flex items-center justify-center gap-2'>
                      Add Category
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default AddCategory