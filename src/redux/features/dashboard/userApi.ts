/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserWallet: builder.query<any, void>({
      query: () => "/wallets/me",
      providesTags: ["Wallet"],
    }),
    getUserTransactions: builder.query<any, void>({
      query: () => "/transactions/me",
      providesTags: ["Transactions"],
    }),
    updateUserProfile: builder.mutation<any, { id: string; name?: string; email?: string }>({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Wallet"],
    }),
    changePassword: builder.mutation<any, { currentPassword: string, newPassword: string }> ({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserWalletQuery, useGetUserTransactionsQuery, useUpdateUserProfileMutation, useChangePasswordMutation } = userApi;
