/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";

export const agentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgentWallet: builder.query<any, void>({
      query: () => "/wallets/me",
      providesTags: ["Wallet"],
    }),
    getAgentTransactions: builder.query<any, void>({
      query: () => "/transactions/me",
      providesTags: ["Transactions"],
    }),
    cashIn: builder.mutation<any, { userEmail: string; amount: number }>({
      query: (data) => ({
        url: "/transactions/cash-in",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transactions"],
    }),
    cashOut: builder.mutation<any, { userEmail: string; amount: number }>({
      query: (data) => ({
        url: "/transactions/cash-out",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transactions"],
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

export const {
  useGetAgentWalletQuery,
  useGetAgentTransactionsQuery,
  useCashInMutation,
  useCashOutMutation,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = agentApi;
