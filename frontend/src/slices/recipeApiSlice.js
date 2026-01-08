import { apiSlice } from "./apiSlice";
import { RECIPE_URL } from "../constants"

const recipeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
      getRecipes: builder.query({
        query: ()=>({
          url: RECIPE_URL,    
        }),
        keepUnusedDataFor: 5,
        providesTags: ['Recipe']
      }),
      getRecipeById: builder.query({
        query: (id)=>({
          url: `${RECIPE_URL}/${id}`
        }),
        keepUnusedDataFor: 5,
        providesTags: ['Recipe']
      }),
      addRecipe: builder.mutation({
        query: (data)=>({
          url: RECIPE_URL,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Recipe"],
      })
    })
})

export const {useGetRecipesQuery, useGetRecipeByIdQuery, useAddRecipeMutation} = recipeApiSlice;