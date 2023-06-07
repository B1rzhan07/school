// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest } from "../components/Login/typesLogin";

export interface ILogin {
  authenticationToken: string;
  email: string;
  role: string;
  refreshToken: string;
  expiresAt: number[];
}
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://195.49.212.183:8090" }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginRequest, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = pokemonApi;
