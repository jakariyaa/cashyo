export interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "agent";
    isActive: boolean;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Wallet {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
        role: string;
    };
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
    type: string;
    amount: number;
    fee: number;
    feeType: string;
    feeValue: number;
    fromWalletId: {
        _id: string;
        userId: string;
        balance: number;
    };
    toWalletId: {
        _id: string;
        userId: string;
        balance: number;
    };
    initiatedBy: {
        _id: string;
        name: string;
        email: string;
    };
    status: string;
    createdAt: string;
    updatedAt: string;
}
