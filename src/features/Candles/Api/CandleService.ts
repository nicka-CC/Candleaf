import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const getlocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return key
}
export const candleService = createApi({
  reducerPath: "candleService",
  baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3555",
    }
  ),
  endpoints: (builder) => ({
    getCandles: builder.query({
      query: () => "/candle/get",
    }),
    getCandle: builder.mutation({
      query: (id) => ({
        url: `/candle/get/${id}`,
      }),
    }),
  }),
})
export const {
  useLazyGetCandlesQuery, useGetCandleMutation,useGetCandlesQuery
} = candleService