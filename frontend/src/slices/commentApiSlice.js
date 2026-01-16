import { apiSlice } from "./apiSlice";
import { COMMENT_URL } from "../constants";

const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    getComments: builder.query({
      query: (id) => ({
        url: `${COMMENT_URL}/${id}`,
        method: "GET"
      }),
      providesTags: ["Comment"]
    }),
    addComment: builder.mutation({
      query: ({id, text, rating})=>({
        url: `${COMMENT_URL}/${id}`,
        method: "POST",
        body: { text, rating }
      }),
      invalidatesTags: (result, error, {id}) => [
        {type: "Recipe", id},
        "Comment"
      ]
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `${COMMENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, {id}) => [
        {type: "Recipe", id},
        "Comment"
      ]
    })

  })
})
export const {useAddCommentMutation, useGetCommentsQuery, useDeleteCommentMutation} = commentApiSlice;