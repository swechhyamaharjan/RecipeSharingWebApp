import { apiSlice } from "./apiSlice";
import { RECIPE_URL } from "../constants"

const recipeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
      getRecipes: builder.query({
        query: (keyword = "")=>({
          url: `${RECIPE_URL}?keyword=${encodeURIComponent(keyword)}`,    
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
      }),
      getMyRecipes: builder.query({
        query: ()=>({
          url: `${RECIPE_URL}/myRecipe`,
          method: "GET",
        }),
        providesTags: ["Recipe"],
      }),
      editRecipe: builder.mutation({
        query: ({id, data})=>({
          url: `${RECIPE_URL}/${id}`,
          body: data,
          method: "PUT"
        }),
        invalidatesTags: ["Recipe"]
      }),
    toggleLike: builder.mutation({
      query: (id)=>({
         url: `${RECIPE_URL}/${id}/like`,
         method: 'POST'
      }),
      invalidatesTags: ["Recipe", "User"],
    }),
    toggleFavorite: builder.mutation({
      query: (id) => ({
        url: `${RECIPE_URL}/${id}/fav`,
        method: "POST"
      }),
      invalidatesTags: ["Recipe", "User"],
    }),
    deleteRecipe: builder.mutation({
      query: (id)=>({
        url: `${RECIPE_URL}/${id}`,
        method: "DELETE",     
      }),
      invalidatesTags: ["Recipe"]
    }),
    updateRecipeStatus: builder.mutation({
      query: ({id, status})=>({
        url: `${RECIPE_URL}/${id}/status`,
        method: "PUT",
        body: {status},
      }),
      invalidatesTags: ["Recipe"]
    })
  })
})

export const {useGetRecipesQuery, useGetRecipeByIdQuery, useAddRecipeMutation, useGetMyRecipesQuery, useEditRecipeMutation, useToggleLikeMutation, useToggleFavoriteMutation, useDeleteRecipeMutation, useUpdateRecipeStatusMutation} = recipeApiSlice;