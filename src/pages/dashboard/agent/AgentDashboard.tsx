

import { DashboardNav } from "@/components/layout/Dashboard-Nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetAgentTransactionsQuery,
  useGetAgentWalletQuery,
} from "@/redux/features/dashboard/agentApi";

import { DashboardSkeleton } from "@/components/common/DashboardSkeleton";
import { AgentStats } from "./components/AgentStats";
import { AgentQuickActions } from "./components/AgentQuickActions";
import { AgentTransactions } from "./components/AgentTransactions";
import { AgentCommission } from "./components/AgentCommission";
import { MotionWrapper } from "@/components/common/motion-wrapper";

export default function AgentDashboard() {
  const { isLoading: walletLoading } = useGetAgentWalletQuery();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetAgentTransactionsQuery();

  if (walletLoading || transactionsLoading) {
    return <DashboardSkeleton />;
  }

  // Logic calculation for stats (moved from render but keep here to pass props)
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
          (tx: { initiatedBy: { _id: string } }) => tx.initiatedBy?._id
        ).filter(Boolean)
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

  const commissionHistoryArray = commissionHistory ? Object.values(commissionHistory) : [];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 bg-primary/5 pointer-events-none" />
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <DashboardNav />
      <div className="container mx-auto p-6 max-w-7xl relative z-10 pt-8">
        <MotionWrapper>
          <div className="mb-8 pl-1">
            <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
              Agent Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage cash-in/out operations and track commissions
            </p>
          </div>

          <AgentStats stats={agentStats} />

          <div className="mt-8">
            <AgentQuickActions />
          </div>

          <Tabs defaultValue="transactions" className="space-y-6 mt-8">
            <TabsList className="bg-muted/50 p-1 rounded-xl h-auto w-fit">
              <TabsTrigger value="transactions" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Transactions</TabsTrigger>
              <TabsTrigger value="commission" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Commission History</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="mt-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>History of cash-ins and cash-outs</CardDescription>
                </CardHeader>
                <CardContent>
                  <AgentTransactions
                    transactions={transactionsData?.data || []}
                    isLoading={transactionsLoading}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commission" className="mt-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Commission Report</CardTitle>
                  <CardDescription>Monthly breakdown of your earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <AgentCommission commissionHistory={commissionHistoryArray as any} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </MotionWrapper>
      </div>
    </div>
  );
}
