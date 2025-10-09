/* eslint-disable @typescript-eslint/no-unused-vars */
import UpdateProfileForm from "@/components/common/update-profile-form";
import { DashboardNav } from "@/components/layout/Dashboard-Nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCashInMutation,
  useCashOutMutation,
  useGetAgentTransactionsQuery,
  useGetAgentWalletQuery,
} from "@/redux/features/dashboard/agentApi";
import { toast } from "sonner";

import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Filter,
  Percent,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function AgentDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const itemsPerPage = 5;

  const { isLoading: walletLoading } = useGetAgentWalletQuery();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetAgentTransactionsQuery();
  const [cashIn, { isLoading: isCashingIn }] = useCashInMutation();
  const [cashOut, { isLoading: isCashingOut }] = useCashOutMutation();

  const [cashInUser, setCashInUser] = useState("");
  const [cashInAmount, setCashInAmount] = useState("");
  const [cashOutUser, setCashOutUser] = useState("");
  const [cashOutAmount, setCashOutAmount] = useState("");

  const handleCashIn = async () => {
    try {
      await cashIn({
        userEmail: cashInUser,
        amount: Number(cashInAmount),
      }).unwrap();
      toast.success("Success", { description: "Cash-in successful." });
      setCashInUser("");
      setCashInAmount("");
    } catch (error) {
      toast.error("Error", { description: "Cash-in failed." });
    }
  };

  const handleCashOut = async () => {
    try {
      await cashOut({
        userEmail: cashOutUser,
        amount: Number(cashOutAmount),
      }).unwrap();
      toast.success("Success", { description: "Cash-out successful." });
      setCashOutUser("");
      setCashOutAmount("");
    } catch (error) {
      toast.error("Error", { description: "Cash-out failed." });
    }
  };

  const filteredTransactions =
    transactionsData?.data?.filter((tx: { type: string }) => {
      return filterType === "all" || tx.type === filterType;
    }) || [];

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (walletLoading || transactionsLoading) {
    return <div>Loading...</div>;
  }

  const agentStats = {
    totalCashIn:
      transactionsData?.data?.reduce(
        (acc: number, tx: { type: string; amount: number }) =>
          tx.type === "cash-in" ? acc + tx.amount : acc,
        0
      ) || 0,
    totalCashOut:
      transactionsData?.data?.reduce(
        (acc: number, tx: { type: string; amount: number }) =>
          tx.type === "cash-out" ? acc + tx.amount : acc,
        0
      ) || 0,
    totalCommission:
      transactionsData?.data?.reduce(
        (acc: number, tx: { fee: number }) => acc + (tx.fee || 0),
        0
      ) || 0,
    activeUsers:
      new Set(
        transactionsData?.data?.map(
          (tx: { initiatedBy: { _id: string } }) => tx.initiatedBy._id
        )
      ).size || 0,
  };

  const commissionHistory = transactionsData?.data?.reduce(
    (
      acc: Record<
        string,
        { month: string; amount: number; transactions: number }
      >,
      tx: { createdAt: string; fee: number }
    ) => {
      const month = new Date(tx.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = { month, amount: 0, transactions: 0 };
      }
      acc[month].amount += tx.fee || 0;
      acc[month].transactions += 1;
      return acc;
    },
    {}
  );

  const commissionHistoryArray: {
    month: string;
    amount: number;
    transactions: number;
  }[] = commissionHistory ? Object.values(commissionHistory) : [];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto p-6 max-w-7xl">
        {}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Agent Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage cash-in/out operations and track commissions
          </p>
        </div>

        {}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Cash-In
              </CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ৳{agentStats.totalCashIn.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Cash-Out
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ৳{agentStats.totalCashOut.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Commission
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ৳{agentStats.totalCommission.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agentStats.activeUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Served this month
              </p>
            </CardContent>
          </Card>
        </div>

        {}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Perform cash-in or cash-out operations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <ArrowDownLeft className="h-4 w-4" />
                  Cash-In for User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cash-In for User</DialogTitle>
                  <DialogDescription>
                    Add money to a user's wallet
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="cashin-user">User ID / Phone / Email</Label>
                    <Input
                      id="cashin-user"
                      placeholder="Enter user identifier"
                      value={cashInUser}
                      onChange={(e) => setCashInUser(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cashin-amount">Amount</Label>
                    <Input
                      id="cashin-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={cashInAmount}
                      onChange={(e) => setCashInAmount(e.target.value)}
                    />
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Commission (1%): ৳0.00
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleCashIn}
                    disabled={isCashingIn}
                  >
                    {isCashingIn ? "Processing..." : "Confirm Cash-In"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowUpRight className="h-4 w-4" />
                  Cash-Out for User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cash-Out for User</DialogTitle>
                  <DialogDescription>
                    Withdraw money from a user's wallet
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="cashout-user">
                      User ID / Phone / Email
                    </Label>
                    <Input
                      id="cashout-user"
                      placeholder="Enter user identifier"
                      value={cashOutUser}
                      onChange={(e) => setCashOutUser(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cashout-amount">Amount</Label>
                    <Input
                      id="cashout-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={cashOutAmount}
                      onChange={(e) => setCashOutAmount(e.target.value)}
                    />
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Commission (1.5%): ৳0.00
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleCashOut}
                    disabled={isCashingOut}
                  >
                    {isCashingOut ? "Processing..." : "Confirm Cash-Out"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="commission">Commission History</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            {}
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

            {}
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View all your agent transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paginatedTransactions.map(
                    (tx: {
                      _id: string;
                      type: string;
                      createdAt: string;
                      initiatedBy: { name: string; _id: string };
                      amount: number;
                      fee: number;
                    }) => (
                      <div
                        key={tx._id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-full ${
                              tx.type === "cash-in"
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
                          <p className="font-bold">
                            ৳{tx.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-primary">
                            Commission: ৳{tx.fee?.toLocaleString() || 0}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredTransactions.length
                    )}{" "}
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
          </TabsContent>

          <TabsContent value="commission" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Commission History
                </CardTitle>
                <CardDescription>
                  Track your monthly commission earnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commissionHistoryArray.map(
                    (record: {
                      month: string;
                      transactions: number;
                      amount: number;
                    }) => (
                      <div
                        key={record.month}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <TrendingUp className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{record.month}</p>
                            <p className="text-sm text-muted-foreground">
                              {record.transactions} transactions
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            ৳{record.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Agent Profile
                </CardTitle>
                <CardDescription>
                  Manage your agent account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <UpdateProfileForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
