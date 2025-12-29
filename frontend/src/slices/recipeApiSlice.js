import { apiSlice } from "./apiSlice";
import { RECIPE_URL } from "../constants"

const recipeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
      getRecipes: builder.query({
        query: ()=>({
          url: RECIPE_URL,    
        }),
        keepUnusedDataFor: 5,
      })
    })
})

export const {useGetRecipesQuery} = recipeApiSlice;
