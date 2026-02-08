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
        method: "POST",
        credentials: "include",
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
      }),
      providesTags: ["User"]
    }),
    allfavorites: builder.query({
      query: ()=> ({
        url: `${USER_URL}/allFavorites`,
        method: "GET",
      }),
      providesTags: ["User"]
    }),
    updateProfile: builder.mutation({
      query: (data)=>({
        url: `${USER_URL}/updateProfile`,
        method: "PUT",
        body: data,
      })
    }),
    getAllUsers: builder.query({
      query: ()=>({
        url: `${USER_URL}`,
        method: "GET",
      }),
      providesTags: ["User"]
    }),
    sendOtp: builder.mutation({
      query: (data)=>({
        url: `${USER_URL}/sendOtp`,
        method: "POST",
        body: data
      })
    }),
    verifyOtp: builder.mutation({
      query: (data)=>({
        url: `${USER_URL}/verifyOtp`,
        method: "POST",
        body: data
      })
    }),
    resetPassword: builder.mutation({
      query: (data)=>({
        url: `${USER_URL}/resetPassword`,
        method: "POST",
        body: data
      })
    })
   })
})


export const {useLoginMutation, useLogoutMutation, useSignupMutation, useUserfavoriteQuery, useUpdateProfileMutation, useGetAllUsersQuery, useAllfavoritesQuery} = userApiSlice;