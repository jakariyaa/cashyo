import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import { apiSlice } from "../api/apiSlice";
import { clearCredentials, setCredentials } from "./userSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(
              setCredentials({ user: data.data.user, token: "dummy-token" })
            );
          }
        } catch (error) {
          console.error("Registration error:", error);
        }
      },
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(
              setCredentials({ user: data.data.user, token: "dummy-token" })
            );
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    logout: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(clearCredentials());
          }
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
