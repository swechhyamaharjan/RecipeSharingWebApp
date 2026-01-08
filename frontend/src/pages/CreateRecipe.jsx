import { useGetCategoriesQuery } from '../slices/categoryApiSlice'
import { useAddRecipeMutation } from '../slices/recipeApiSlice';
import { useState } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const CreateRecipe = () => {
  const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery();
  const [addRecipe, { isLoading, error }] = useAddRecipeMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setformData] = useState({
    title: "",
    description: "",
    ingredients: [""],
    instruction: [""],
    category: "",
    image: null,
  })
  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name, value, files} = e.target;

    if (name === "image"){
      setformData({...formData, image: files[0]});
    }else{
      setformData({...formData, [name]: value});
    }
  }
const handleArrayChange = (index, value, field)=>{
   const newArray = [...formData[field]];
   newArray[index] = value;
   setformData({...formData, [field]: newArray})
}
const addField = (field) => {
  setformData({...formData, [field]: [...formData[field], ""]});
}
const removeField = (index, field) => {
   const newArray = formData[field].filter((item, i) => i !== index);
   setformData({ ...formData, [field]: newArray.length ? newArray : [""] });
}



  const submitHandler = async(e)=>{
    e.preventDefault();
    if(!userInfo){
      toast.error("Please sign in first");
      return;
    }
    try {
     const data = new FormData();
     data.append("title", formData.title);
     data.append("description", formData.description);
     data.append("ingredients", JSON.stringify(formData.ingredients));
     data.append("instruction", JSON.stringify(formData.instruction));
     data.append("category", formData.category);
     data.append("image", formData.image);

     const res = await addRecipe(data).unwrap();

     toast.success(res.message);
     navigate("/recipes");
    } catch (err) {
      toast.error(err?.data?.error || err?.error)
    }

  }
  return (
    <div>
      <div className='max-w-3xl mx-auto px-4 py-10'>
        <h2 className='text-3xl font-bold text-center mb-8 text-green-500'>Create Recipes</h2>

        <form className='bg-white shadow-md rounded-lg p-8 space-y-5'
        onSubmit={submitHandler}>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>Recipe Title</label>
            <input type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
              required />
          </div>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>Description</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400'
              required />
          </div>
          <div>
            <label className='block text-gray-800 font-semibold mb-2 text-lg'>Ingredients</label>
            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex items-center justify-center w-8 h-11 bg-green-100 text-green-700 font-semibold rounded-lg">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                    placeholder="e.g., 2 cups flour"
                    className='flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition'
                    required
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField(index, 'ingredients')}
                      className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField('ingredients')}
                className="w-full py-3 border-2 border-dashed border-green-400 text-green-600 rounded-lg hover:bg-green-50 transition font-semibold"
              >
                + Add Ingredient
              </button>
            </div>
          </div>
          {/* Instructions */}
          <div>
            <label className='block text-gray-800 font-semibold mb-2 text-lg'>Instructions</label>
            <div className="space-y-3">
              {formData.instruction.map((step, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex items-center justify-center w-8 h-11 bg-emerald-100 text-emerald-700 font-semibold rounded-lg">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'instruction')}
                    placeholder="e.g., Preheat oven to 350°F"
                    className='flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition'
                    required
                  />
                  {formData.instruction.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField(index, 'instruction')}
                      className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField('instruction')}
                className="w-full py-3 border-2 border-dashed border-green-400 text-green-600 rounded-lg hover:bg-green-50 transition font-semibold"
              >
                + Add Step
              </button>
            </div>
          </div>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>Category</label>
            <select name='category'
            value={formData.category}
            onChange={handleChange}
              className='w-44 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
              required>
              <option value=''>Select Category</option>
              {
                categories?.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))
              }
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Image 
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
            {isLoading ? "Adding..." : "Add Recipe"}
          </button>
        </form>
        {loadingCategories && <Loader />}
      </div>
    </div>
  )
}

export default CreateRecipe