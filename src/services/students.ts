// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://195.49.212.183:8090" }),
  endpoints: (builder) => ({
    getStudents: builder.query<unknown, unknown>({
      query: () => `/participant`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetStudentsQuery } = studentApi;
