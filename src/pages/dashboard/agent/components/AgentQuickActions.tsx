
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
import { getErrorMessage } from "@/utils/error";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
    useCashInMutation,
    useCashOutMutation,
} from "@/redux/features/dashboard/agentApi";

export function AgentQuickActions() {
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
            toast.error("Error", { description: getErrorMessage(error) });
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
            toast.error("Error", { description: getErrorMessage(error) });
        }
    };

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Perform cash-in or cash-out operations</CardDescription>
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
                            <DialogDescription>Add money to a user's wallet</DialogDescription>
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
                                <Label htmlFor="cashout-user">User ID / Phone / Email</Label>
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
    );
}
