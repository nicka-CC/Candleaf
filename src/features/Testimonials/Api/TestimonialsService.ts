import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const testimonialsService = createApi({
  reducerPath: "testimonialsService",
  baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3555",
    }
  ),
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => "/testimonials/get",
    }),
  }),
})
export const {
  useGetTestimonialsQuery,
} = testimonialsService