import { useState, useEffect } from 'react'
import { useAddCategoryMutation, useUpdateCategoryMutation, useGetCategoryByIdQuery } from '../../slices/categoryApiSlice'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';

const AddCategory = () => {
  const { id } = useParams();
  const [addCategory, { isLoading: adding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();

  const navigate = useNavigate();

  const isEditMode = Boolean(id);
  const { data: category } = useGetCategoryByIdQuery(id, { skip: !isEditMode });

  const isSubmitting = adding || updating;


  useEffect(() => {
    if (category && isEditMode) {
      setFormdata({
        name: category.name,
        description: category.description,
        image: null
      })
    }
  }, [category, isEditMode]);

  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    image: null
  });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormdata({ ...formdata, image: files[0] });
    } else {
      setFormdata({ ...formdata, [name]: value })
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formdata.name);
      data.append("description", formdata.description);
      if (formdata.image) {
        data.append("image", formdata.image);
      }
      if (isEditMode) {
        await updateCategory({ id, data }).unwrap();
        toast.success("Category updated successfully!!");
      } else {
        await addCategory(data).unwrap();
        toast.success("Category added successfully!!");
      }
      navigate("/admin/category");
    } catch (error) {
      toast.error(error?.data?.error || "Operation Failed!!")
    }
  }

  return (
    <div className='min-h-screen py-8 px-4'>
      <div className="max-w-2xl mx-auto p-6 lg:p-8">
        {/* Header */}

          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-8'>
            {isEditMode ? "Update Category" : "Add New Category"}
          </h2>

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
                value={formdata.name}
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
                value={formdata.description}
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
                  {formdata.image && (
                    <p className='mt-2 text-sm text-emerald-600 font-medium'>
                      Selected file: {formdata.image.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className='border-t border-gray-200 pt-6'>
              {/* Action Buttons */}
              <div className='flex gap-4'>
                <button
                  type="button"
                  onClick={() => navigate("/admin/category")}
                  className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all'
                >
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                 className='flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5l'>
                 {isSubmitting ? isEditMode ? "Updating..." : "Adding..."
                : isEditMode ? "Update Category" : "Add Category"}
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