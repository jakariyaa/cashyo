/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardSkeleton } from "@/components/common/DashboardSkeleton";
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
import { getErrorMessage } from "@/utils/error";
import { MotionWrapper } from "@/components/common/motion-wrapper";

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

  if (walletLoading || transactionsLoading) {
    return <DashboardSkeleton />;
  }

  const filteredTransactions =
    transactionsData?.data?.filter((tx: any) => {
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
    } catch (error) {
      toast.error("Error", { description: getErrorMessage(error) });
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawMoney({ amount: withdrawAmount }).unwrap();
      toast.success("Success", {
        description: "Money withdrawn successfully.",
      });
    } catch (error) {
      toast.error("Error", { description: getErrorMessage(error) });
    }
  };

  const handleSendMoney = async () => {
    try {
      await sendMoney({ receiverEmail, amount: sendAmount }).unwrap();
      toast.success("Success", { description: "Money sent successfully." });
    } catch (error) {
      toast.error("Error", { description: getErrorMessage(error) });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 bg-primary/5 pointer-events-none" />
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <DashboardNav />
      {/* Reduced top padding since nav is sticky */}
      <div className="container mx-auto p-6 max-w-7xl relative z-10 pt-8">
        <MotionWrapper>
          <div className="mb-8 pl-1">
            <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
              User Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your wallet and transactions
            </p>
          </div>

          <Card className="mb-8 border-0 bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20 pointer-events-none" />
            <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl transform translate-x-12 -translate-y-12" />

            <CardHeader className="relative relative z-10 pb-2">
              <CardTitle className="flex items-center gap-2 text-primary-foreground/90 font-medium text-lg">
                <Wallet className="h-5 w-5" />
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              {walletLoading ? (
                <p className="text-5xl font-bold mb-6 opacity-50">Loading...</p>
              ) : (
                <p className="text-5xl sm:text-6xl font-bold mb-8 tracking-tight">
                  ৳{walletData?.data?.balance.toLocaleString()}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="lg" className="gap-2 h-12 px-6 shadow-sm font-semibold hover:bg-white/20 hover:text-white border-0 bg-white/10 text-white backdrop-blur-md transition-all">
                      <ArrowDownLeft className="h-5 w-5" />
                      Deposit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md p-8">
                    <DialogHeader>
                      <DialogTitle>Deposit Money</DialogTitle>
                      <DialogDescription>
                        Add money to your wallet
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="deposit-amount">Amount</Label>
                        <Input
                          id="deposit-amount"
                          type="number"
                          placeholder="Enter amount"
                          className="h-11"
                          onChange={(e) =>
                            setDepositAmount(Number(e.target.value))
                          }
                        />
                      </div>
                      <Button
                        className="w-full h-11 text-base"
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
                    <Button variant="secondary" size="lg" className="gap-2 h-12 px-6 shadow-sm font-semibold hover:bg-white/20 hover:text-white border-0 bg-white/10 text-white backdrop-blur-md transition-all">
                      <ArrowUpRight className="h-5 w-5" />
                      Withdraw
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md p-8">
                    <DialogHeader>
                      <DialogTitle>Withdraw Money</DialogTitle>
                      <DialogDescription>
                        Transfer money from your wallet
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="withdraw-amount">Amount</Label>
                        <Input
                          id="withdraw-amount"
                          type="number"
                          placeholder="Enter amount"
                          className="h-11"
                          onChange={(e) =>
                            setWithdrawAmount(Number(e.target.value))
                          }
                        />
                      </div>
                      <Button
                        className="w-full h-11 text-base"
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
                    <Button variant="secondary" size="lg" className="gap-2 h-12 px-6 shadow-sm font-semibold hover:bg-white/20 hover:text-white border-0 bg-white/10 text-white backdrop-blur-md transition-all">
                      <Send className="h-5 w-5" />
                      Send Money
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md p-8">
                    <DialogHeader>
                      <DialogTitle>Send Money</DialogTitle>
                      <DialogDescription>
                        Transfer money to another user
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient">Recipient Email</Label>
                        <Input
                          id="recipient"
                          placeholder="Enter email"
                          className="h-11"
                          onChange={(e) => setReceiverEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="send-amount">Amount</Label>
                        <Input
                          id="send-amount"
                          type="number"
                          placeholder="Enter amount"
                          className="h-11"
                          onChange={(e) => setSendAmount(Number(e.target.value))}
                        />
                      </div>
                      <Button
                        className="w-full h-11 text-base"
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

          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList className="bg-muted/50 p-1 rounded-xl h-auto">
              <TabsTrigger value="transactions" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                <Card className="h-fit bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Filter className="h-5 w-5 text-primary" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="filter-type">Transaction Type</Label>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger id="filter-type" className="bg-background/50">
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
                    <div className="space-y-2">
                      <Label htmlFor="filter-status">Status</Label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger id="filter-status" className="bg-background/50">
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

                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle>History</CardTitle>
                    <CardDescription>
                      Recent account activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {transactionsLoading ? (
                      <div className="flex justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : filteredTransactions.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        No transactions found
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {paginatedTransactions.map((tx: any, i: number) => {
                          const isCredit =
                            tx.type === "add" ||
                            (tx.toWalletId?.userId === user?._id &&
                              tx.type !== "withdraw");

                          return (
                            <MotionWrapper key={tx._id} delay={i * 0.05}>
                              <div
                                className="flex items-center justify-between p-4 bg-background/40 hover:bg-background/80 border border-border/40 rounded-xl transition-all duration-300 group"
                              >
                                <div className="flex items-center gap-4">
                                  <div
                                    className={`p-3 rounded-xl shadow-sm transition-transform group-hover:scale-105 ${isCredit
                                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                                      }`}
                                  >
                                    {isCredit ? (
                                      <ArrowDownLeft className="h-5 w-5" />
                                    ) : (
                                      <ArrowUpRight className="h-5 w-5" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-foreground">
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
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      {new Date(tx.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p
                                    className={`font-bold text-lg ${isCredit
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-foreground"
                                      }`}
                                  >
                                    {isCredit ? "+" : "-"}৳
                                    {Math.abs(tx.amount).toLocaleString()}
                                  </p>
                                  <span
                                    className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full inline-block mt-1 ${tx.status === "completed"
                                      ? "bg-green-100/50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                      : "bg-yellow-100/50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                      }`}
                                  >
                                    {tx.status}
                                  </span>
                                </div>
                              </div>
                            </MotionWrapper>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-8 border-t pt-4">
                      <p className="text-sm text-muted-foreground">
                        Showing {Math.min(filteredTransactions.length, startIndex + 1)}-
                        {Math.min(
                          startIndex + itemsPerPage,
                          filteredTransactions.length
                        )}{" "}
                        of {filteredTransactions.length}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="hover:bg-muted"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="hover:bg-muted"
                        >
                          Next <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

          </Tabs>
        </MotionWrapper>
      </div>
    </div>
  );
}
