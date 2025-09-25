import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = "https://digital-wallet-system-api.jakariya.eu.org/api";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "agent" | "admin";
  isActive: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  _id: string;
  userId: string;
  walletId: string;
  balance: number;
  isActive: boolean;
  dailyLimit: number;
  monthlyLimit: number;
  dailyAmountUsed: number;
  monthlyAmountUsed: number;
  lastResetDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  type: "add" | "withdraw" | "send" | "cash-in" | "cash-out";
  amount: number;
  fee?: number;
  feeType?: string;
  feeValue?: number;
  fromWalletId?: string;
  toWalletId?: string;
  initiatedBy: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
  statusCode: number;
}

export interface WalletResponse {
  success: boolean;
  message: string;
  data: Wallet;
  statusCode: number;
}

export interface TransactionResponse {
  success: boolean;
  message: string;
  data: {
    transaction: Transaction;
    newBalance?: number;
    newUserBalance?: number;
  };
  statusCode: number;
}

export interface TransactionsResponse {
  success: boolean;
  message: string;
  data: Transaction[];
  statusCode: number;
}

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include", // Include HTTP-only cookies
  }),
  tagTypes: ["User", "Wallet", "Transaction"],
  endpoints: (builder) => ({
    // Auth endpoints
    register: builder.mutation<
      AuthResponse,
      {
        name: string;
        email: string;
        password: string;
        role?: "user" | "agent";
      }
    >({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation<
      AuthResponse,
      {
        email: string;
        password: string;
      }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User", "Wallet", "Transaction"],
    }),

    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User", "Wallet", "Transaction"],
    }),

    // Wallet endpoints
    getMyWallet: builder.query<WalletResponse, void>({
      query: () => "/wallets/me",
      providesTags: ["Wallet"],
    }),

    getAllWallets: builder.query<{ success: boolean; data: Wallet[] }, void>({
      query: () => "/wallets",
      providesTags: ["Wallet"],
    }),

    // Transaction endpoints
    addMoney: builder.mutation<TransactionResponse, { amount: number }>({
      query: (data) => ({
        url: "/transactions/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),

    withdrawMoney: builder.mutation<TransactionResponse, { amount: number }>({
      query: (data) => ({
        url: "/transactions/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),

    sendMoney: builder.mutation<
      TransactionResponse,
      {
        receiverEmail: string;
        amount: number;
      }
    >({
      query: (data) => ({
        url: "/transactions/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),

    cashIn: builder.mutation<
      TransactionResponse,
      {
        userEmail: string;
        amount: number;
      }
    >({
      query: (data) => ({
        url: "/transactions/cash-in",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),

    cashOut: builder.mutation<
      TransactionResponse,
      {
        userEmail: string;
        amount: number;
      }
    >({
      query: (data) => ({
        url: "/transactions/cash-out",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),

    getMyTransactions: builder.query<TransactionsResponse, void>({
      query: () => "/transactions/me",
      providesTags: ["Transaction"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMyWalletQuery,
  useGetAllWalletsQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useCashInMutation,
  useCashOutMutation,
  useGetMyTransactionsQuery,
} = walletApi;
