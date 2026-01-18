import { CONTACT_URL } from "../constants.js";
import { apiSlice } from "./apiSlice";

const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    sendContact: builder.mutation({
      query: (data)=>({
        url: `${CONTACT_URL}/sendContact`,
        method: "POST",
        body: data,
      })
    })
  })
})
export const {useSendContactMutation} = contactApiSlice;