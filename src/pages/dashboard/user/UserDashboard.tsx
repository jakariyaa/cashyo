/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useGetUserTransactionsQuery,
  useGetUserWalletQuery,
} from "@/redux/features/dashboard/userApi";
import {
  useAddMoneyMutation,
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
} from "@/redux/features/transactions/transactionsApi";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Send,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function UserDashboard() {
  const { data: walletData, isLoading: walletLoading } =
    useGetUserWalletQuery();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetUserTransactionsQuery();
  const { user } = useSelector((state: any) => state.user);

  const [addMoney, { isLoading: isAddingMoney }] = useAddMoneyMutation();
  const [withdrawMoney, { isLoading: isWithdrawingMoney }] =
    useWithdrawMoneyMutation();
  const [sendMoney, { isLoading: isSendingMoney }] = useSendMoneyMutation();

  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [sendAmount, setSendAmount] = useState(0);
  const [receiverEmail, setReceiverEmail] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const itemsPerPage = 5;

  const filteredTransactions =
    transactionsData?.data.filter((tx: any) => {
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

  const handleDeposit = async () => {
    try {
      await addMoney({ amount: depositAmount }).unwrap();
      toast.success("Success", {
        description: "Money deposited successfully.",
      });
    } catch {
      toast.error("Error", { description: "Failed to deposit money." });
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawMoney({ amount: withdrawAmount }).unwrap();
      toast.success("Success", {
        description: "Money withdrawn successfully.",
      });
    } catch {
      toast.error("Error", { description: "Failed to withdraw money." });
    }
  };

  const handleSendMoney = async () => {
    try {
      await sendMoney({ receiverEmail, amount: sendAmount }).unwrap();
      toast.success("Success", { description: "Money sent successfully." });
    } catch {
      toast.error("Error", { description: "Failed to send money." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto p-6 max-w-7xl">
        {}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            User Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your wallet and transactions
          </p>
        </div>

        {}
        <Card className="mb-8 bg-gradient-to-br from-primary to-chart-2 text-primary-foreground border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary-foreground">
              <Wallet className="h-5 w-5" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {walletLoading ? (
              <p className="text-5xl font-bold mb-6">Loading...</p>
            ) : (
              <p className="text-5xl font-bold mb-6">
                ৳{walletData?.data?.balance.toLocaleString()}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <ArrowDownLeft className="h-4 w-4" />
                    Deposit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deposit Money</DialogTitle>
                    <DialogDescription>
                      Add money to your wallet
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="deposit-amount">Amount</Label>
                      <Input
                        id="deposit-amount"
                        type="number"
                        placeholder="Enter amount"
                        onChange={(e) =>
                          setDepositAmount(Number(e.target.value))
                        }
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleDeposit}
                      disabled={isAddingMoney}
                    >
                      {isAddingMoney ? "Depositing..." : "Confirm Deposit"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <ArrowUpRight className="h-4 w-4" />
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdraw Money</DialogTitle>
                    <DialogDescription>
                      Transfer money from your wallet
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="withdraw-amount">Amount</Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="Enter amount"
                        onChange={(e) =>
                          setWithdrawAmount(Number(e.target.value))
                        }
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleWithdraw}
                      disabled={isWithdrawingMoney}
                    >
                      {isWithdrawingMoney
                        ? "Withdrawing..."
                        : "Confirm Withdrawal"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <Send className="h-4 w-4" />
                    Send Money
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Money</DialogTitle>
                    <DialogDescription>
                      Transfer money to another user
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="recipient">Recipient Email</Label>
                      <Input
                        id="recipient"
                        placeholder="Enter email"
                        onChange={(e) => setReceiverEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="send-amount">Amount</Label>
                      <Input
                        id="send-amount"
                        type="number"
                        placeholder="Enter amount"
                        onChange={(e) => setSendAmount(Number(e.target.value))}
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleSendMoney}
                      disabled={isSendingMoney}
                    >
                      {isSendingMoney ? "Sending..." : "Send Money"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
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

            {}
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View all your recent transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {transactionsLoading ? (
                  <p>Loading transactions...</p>
                ) : (
                  <div className="space-y-4">
                    {paginatedTransactions.map((tx: any) => {
                      const isCredit =
                        tx.type === "add" ||
                        (tx.toWalletId?.userId === user?._id &&
                          tx.type !== "withdraw");

                      return (
                        <div
                          key={tx._id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-2 rounded-full ${
                                isCredit
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
                                {tx.type === "send" &&
                                  isCredit &&
                                  "Received Money"}
                                {tx.type === "send" &&
                                  !isCredit &&
                                  "Sent Money"}
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
                              className={`font-bold ${
                                isCredit
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {isCredit ? "+" : "-"}৳
                              {Math.abs(tx.amount).toLocaleString()}
                            </p>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                tx.status === "completed"
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

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UpdateProfileForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
