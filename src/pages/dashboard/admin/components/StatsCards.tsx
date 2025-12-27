import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, DollarSign, UserCog, Users } from "lucide-react";

interface StatsCardsProps {
    usersData: any[]; // Using any[] for data arrays to avoid complex generic matching for now, or use User[] if data structure matches exactly
    transactionsData: any[];
}

export function StatsCards({ usersData, transactionsData }: StatsCardsProps) {
    const systemStats = {
        totalUsers: usersData?.length || 0,
        totalAgents:
            usersData?.filter((user: any) => user.role === "agent").length ||
            0,
        totalTransactions: transactionsData?.length || 0,
        totalVolume:
            transactionsData?.reduce(
                (acc: number, tx: any) => acc + tx.amount,
                0
            ) || 0,
        activeUsers:
            usersData?.filter((user: any) => user.isActive).length || 0,
        systemHealth: 98.5,
    };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {systemStats.totalUsers.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        {systemStats.activeUsers} active
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Agents
                    </CardTitle>
                    <UserCog className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {systemStats.totalAgents}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Active agents
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        Transaction Volume
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        ৳{(systemStats.totalVolume / 1000000).toFixed(1)}M
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        {systemStats.totalTransactions} transactions
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        System Health
                    </CardTitle>
                    <Activity className="h-4 w-4 text-chart-3" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {systemStats.systemHealth}%
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                        All systems operational
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
