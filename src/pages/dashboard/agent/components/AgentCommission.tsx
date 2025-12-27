
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Percent, TrendingUp } from "lucide-react";

interface CommissionRecord {
    month: string;
    amount: number;
    transactions: number;
}

interface AgentCommissionProps {
    commissionHistory: CommissionRecord[];
}

export function AgentCommission({ commissionHistory }: AgentCommissionProps) {
    return (
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
                    {commissionHistory.map((record) => (
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
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
