import { Badge } from "@/components/ui/badge";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Transaction } from "@/types/admin-dashboard";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";

interface TransactionTableProps {
    transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
    const [page, setPage] = useState(1);
    const [filterType, setFilterType] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const itemsPerPage = 5;

    const filteredTransactions =
        transactions?.filter((tx) => {
            const typeMatch = filterType === "all" || tx.type === filterType;
            const statusMatch =
                filterStatus === "all" || tx.status === filterStatus;
            return typeMatch && statusMatch;
        }) || [];

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
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
                        <Label htmlFor="filter-tx-type">Transaction Type</Label>
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger id="filter-tx-type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="deposit">Deposit</SelectItem>
                                <SelectItem value="withdraw">Withdraw</SelectItem>
                                <SelectItem value="send">Send</SelectItem>
                                <SelectItem value="cash-in">Cash-In</SelectItem>
                                <SelectItem value="cash-out">Cash-Out</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <Label htmlFor="filter-tx-status">Status</Label>
                        <Select
                            value={filterStatus}
                            onValueChange={setFilterStatus}
                        >
                            <SelectTrigger id="filter-tx-status">
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

            <Card>
                <CardHeader>
                    <CardTitle>All Transactions</CardTitle>
                    <CardDescription>Monitor all system transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedTransactions.map((tx) => (
                                <TableRow key={tx._id}>
                                    <TableCell className="font-mono text-sm">
                                        #{tx._id}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {tx.initiatedBy?.name || "Unknown User"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{tx.type}</Badge>
                                    </TableCell>
                                    <TableCell className="font-bold">
                                        ৳{tx.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(tx.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                tx.status === "completed"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {tx.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

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
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setPage((p) => Math.min(totalPages, p + 1))
                                }
                                disabled={page === totalPages}
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
