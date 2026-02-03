import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";


const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    getCategories: builder.query({
      query: ()=> ({
        url: CATEGORY_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Category']
    }),
    addCategory: builder.mutation({
      query: (data)=>({
        url: CATEGORY_URL,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Category"]
    }),
    updateCategory: builder.mutation({
      query: ({id, data})=> ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PUT",
        body:  data
      }),
      invalidatesTags: ["Category"]
    }),
    deleteCategory: builder.mutation({
      query: (id)=>({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE"
      }),
     invalidatesTags: ["Category"]
    })
  })
})
export const {useGetCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation} = categoryApiSlice;
