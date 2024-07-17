import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3555"}),
  endpoints: (builder) => ({
    RegisterUser: builder.query({
      query: (body) => ({
        url: `/auth//reg`,
        method: "POST",
        body: body,
      })
    }),
    loginUser: builder.query({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body: body,
      })
    })
  })
})
export const {
  useLazyLoginUserQuery, useLazyRegisterUserQuery
} = authService;