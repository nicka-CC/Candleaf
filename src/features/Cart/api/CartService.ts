import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const cartService = createApi({
  reducerPath: "cartService",
  baseQuery: fetchBaseQuery(
    {
      baseUrl: "http://localhost:3555",
      prepareHeaders: (headers, {getState}) => {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("Authorization", "Bearer " + token);
        }
        return headers;
      },
    }),
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: () => "/cart/get",
    }),
    updateUserCart: builder.mutation({
      query: ({id}) => ({
        url: `/cart/add/${id}`,
        method: "POST",
      }),
    }),
    deleteCandleInUserCart: builder.mutation({
      query: ({id}) => ({
        url: `/cart/delete/${id}`,
        method: "DELETE",
      })
    })
  })
})
export const {
  useDeleteCandleInUserCartMutation,useUpdateUserCartMutation,useLazyGetUserCartQuery
} = cartService;