
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ArrowDownLeft,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Filter,
} from "lucide-react";
import { useState } from "react";

interface Transaction {
    _id: string;
    type: string;
    status: string;
    amount: number;
    createdAt: string;
    toWalletId?: { userId: string };
    initiatedBy?: { _id: string }; // Add other fields as necessary
}

interface UserTransactionsProps {
    transactions: Transaction[];
    isLoading: boolean;
    userId: string;
}

export function UserTransactions({
    transactions,
    isLoading,
    userId,
}: UserTransactionsProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const itemsPerPage = 5;

    const filteredTransactions =
        transactions?.filter((tx) => {
            const type = filterType === "deposit" ? "add" : filterType;
            const typeMatch = type === "all" || tx.type === type;
            const statusMatch = filterStatus === "all" || tx.status === filterStatus;
            return typeMatch && statusMatch;
        }) || [];

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="space-y-4">
            { }
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <Label htmlFor="filter-type">Transaction Type</Label>
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger id="filter-type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="deposit">Deposit</SelectItem>
                                <SelectItem value="withdraw">Withdraw</SelectItem>
                                <SelectItem value="send">Send</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <Label htmlFor="filter-status">Status</Label>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger id="filter-status">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            { }
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>View all your recent transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p>Loading transactions...</p>
                    ) : (
                        <div className="space-y-4">
                            {paginatedTransactions.map((tx) => {
                                const isCredit =
                                    tx.type === "add" ||
                                    (tx.toWalletId?.userId === userId && tx.type !== "withdraw");

                                return (
                                    <div
                                        key={tx._id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`p-2 rounded-full ${isCredit
                                                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                                        : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                                    }`}
                                            >
                                                {isCredit ? (
                                                    <ArrowDownLeft className="h-4 w-4" />
                                                ) : (
                                                    <ArrowUpRight className="h-4 w-4" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {tx.type === "send" && isCredit && "Received Money"}
                                                    {tx.type === "send" && !isCredit && "Sent Money"}
                                                    {tx.type === "add" && "Added Money"}
                                                    {tx.type === "withdraw" && "Withdrew Money"}
                                                    {tx.type === "cash-in" && "Cashed In"}
                                                    {tx.type === "cash-out" && "Cashed Out"}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(tx.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p
                                                className={`font-bold ${isCredit
                                                        ? "text-green-600 dark:text-green-400"
                                                        : "text-red-600 dark:text-red-400"
                                                    }`}
                                            >
                                                {isCredit ? "+" : "-"}৳
                                                {Math.abs(tx.amount).toLocaleString()}
                                            </p>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${tx.status === "completed"
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                    }`}
                                            >
                                                {tx.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    { }
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-muted-foreground">
                            Showing {startIndex + 1}-
                            {Math.min(startIndex + itemsPerPage, filteredTransactions.length)}{" "}
                            of {filteredTransactions.length}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                                }
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
