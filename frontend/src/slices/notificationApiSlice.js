import { NOTIFICATION_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotification: builder.query({
      query: ()=>({
        url: `${NOTIFICATION_URL}`,
        method: "GET"
      }),
      providesTags: ["Notification"],
    }),
    markRead: builder.mutation({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/read/${id}`,
        method: "PUT"
      }),
      invalidatesTags: ["Notification"],
    })
  }) 
})

export const {useGetMyNotificationQuery, useMarkReadMutation} = notificationApiSlice;