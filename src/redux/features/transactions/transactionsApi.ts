import type { BaseResponse } from "@/types";
import { apiSlice } from "../api/apiSlice";
import type {
  AddMoneyRequest,
  SendMoneyRequest,
  WithdrawMoneyRequest,
} from "@/types/transactions";

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addMoney: builder.mutation<BaseResponse, AddMoneyRequest>({
      query: (data) => ({
        url: "/transactions/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Wallet" as const }, { type: "Transactions" as const }],
    }),
    withdrawMoney: builder.mutation<BaseResponse, WithdrawMoneyRequest>({
      query: (data) => ({
        url: "/transactions/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Wallet" as const }, { type: "Transactions" as const }],
    }),
    sendMoney: builder.mutation<BaseResponse, SendMoneyRequest>({
      query: (data) => ({
        url: "/transactions/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Wallet" as const }, { type: "Transactions" as const }],
    }),
  }),
});

export const { useAddMoneyMutation, useWithdrawMoneyMutation, useSendMoneyMutation } =
  transactionsApi;
