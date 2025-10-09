/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    approveAgent: builder.mutation<any, { id: string; isApproved: boolean }>({
      query: ({ id, ...data }) => ({
        url: `/users/approve/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<any, { id: string; [key: string]: any }>({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getAllWallets: builder.query<any, void>({
      query: () => "/wallets",
      providesTags: ["Wallets"],
    }),
    blockWallet: builder.mutation<any, { id: string; isActive: boolean }>({
      query: ({ id, ...data }) => ({
        url: `/wallets/block/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Wallets"],
    }),
    getAllTransactions: builder.query<any, void>({
      query: () => "/transactions",
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useApproveAgentMutation,
  useUpdateUserMutation,
  useGetAllWalletsQuery,
  useBlockWalletMutation,
  useGetAllTransactionsQuery,
} = adminApi;
