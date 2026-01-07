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
    })
  })
})
export const {useGetCategoriesQuery} = categoryApiSlice;
