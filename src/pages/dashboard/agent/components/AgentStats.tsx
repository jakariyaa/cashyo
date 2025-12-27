
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, DollarSign, Users } from "lucide-react";

interface AgentStatsProps {
    stats: {
        totalCashIn: number;
        totalCashOut: number;
        totalCommission: number;
        activeUsers: number;
    };
}

export function AgentStats({ stats }: AgentStatsProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Cash-In</CardTitle>
                    <ArrowDownLeft className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        ৳{stats.totalCashIn.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">This month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Cash-Out</CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        ৳{stats.totalCashOut.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">This month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
                    <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-primary">
                        ৳{stats.totalCommission.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">This month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.activeUsers}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Served this month
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
