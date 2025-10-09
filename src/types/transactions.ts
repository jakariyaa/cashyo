export interface AddMoneyRequest {
  amount: number;
}

export interface WithdrawMoneyRequest {
  amount: number;
}

export interface SendMoneyRequest {
  receiverEmail: string;
  amount: number;
}
