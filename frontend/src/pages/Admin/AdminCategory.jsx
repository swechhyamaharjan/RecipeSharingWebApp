import {  useGetCategoriesQuery, useUpdateCategoryMutation } from "../../slices/categoryApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useNavigate } from "react-router";

const AdminCategory = () => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const [updateCategory] = useUpdateCategoryMutation();
  const navigate = useNavigate();

  if(isLoading) return <Loader />
  if(error) return <Message variant="danger">{error.message || "Failed to load categories!!"}</Message>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Manage Categories
              </h2>
              <p className="text-gray-600 text-sm lg:text-base">
                Organize and manage your product categories
              </p>
            </div>
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            onClick={()=>{navigate("/admin/addCategory")}}>
              <span className="flex items-center gap-2">  
                Add Category
              </span>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories yet</h3>
            <p className="text-gray-500 text-center max-w-md">
              Get started by creating your first category to organize your products
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div 
                key={cat._id} 
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-emerald-400 transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>

                {/* Contents */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2.5 text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-all duration-200 shadow-sm hover:shadow">
                      <span className="flex items-center justify-center gap-1.5">
                        Edit
                      </span>
                    </button>

                    <button className="flex-1 px-4 py-2.5 text-sm font-medium bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow">
                      <span className="flex items-center justify-center gap-1.5">
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminCategory