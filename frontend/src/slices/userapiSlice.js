import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";

const userApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data
      }) 
    }),
    logout: builder.mutation({
      query: ()=> ({
        url: `${USER_URL}/logout`,
        method: "POST"
      })
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        body: data,
      })
    }),
    userfavorite: builder.query({
      query: ()=> ({
        url: `${USER_URL}/favorites`,
        method: "GET"
      })
    })
   })
})

export const {useLoginMutation, useLogoutMutation, useSignupMutation, useUserfavoriteQuery} = userApiSlice;