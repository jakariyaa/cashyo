
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

// Define strict types for the transaction object
interface TransactionInitiatedBy {
    _id: string;
    name: string;
}

interface Transaction {
    _id: string;
    type: string;
    createdAt: string; // or Date if transformed
    initiatedBy: TransactionInitiatedBy;
    amount: number;
    fee?: number;
}

interface AgentTransactionsProps {
    transactions: Transaction[];
    isLoading: boolean;
}

export function AgentTransactions({
    transactions,
    isLoading,
}: AgentTransactionsProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState("all");
    const itemsPerPage = 5;

    const filteredTransactions =
        transactions?.filter((tx) => {
            return filterType === "all" || tx.type === filterType;
        }) || [];

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="space-y-4">
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
                                <SelectItem value="cash-in">Cash-In</SelectItem>
                                <SelectItem value="cash-out">Cash-Out</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>View all your agent transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            paginatedTransactions.map((tx) => (
                                <div
                                    key={tx._id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`p-2 rounded-full ${tx.type === "cash-in"
                                                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                                }`}
                                        >
                                            {tx.type === "cash-in" ? (
                                                <ArrowDownLeft className="h-4 w-4" />
                                            ) : (
                                                <ArrowUpRight className="h-4 w-4" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {tx.type === "cash-in" ? "Cash-In" : "Cash-Out"} -{" "}
                                                {tx.initiatedBy.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                User ID: {tx.initiatedBy._id}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">৳{tx.amount.toLocaleString()}</p>
                                        <p className="text-sm text-primary">
                                            Commission: ৳{tx.fee?.toLocaleString() || 0}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

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
