
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
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
import { ArrowDownLeft, ArrowUpRight, Send, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
    useAddMoneyMutation,
    useSendMoneyMutation,
    useWithdrawMoneyMutation,
} from "@/redux/features/transactions/transactionsApi";

interface UserWalletCardProps {
    balance: number;
}

export function UserWalletCard({ balance }: UserWalletCardProps) {
    const [addMoney, { isLoading: isAddingMoney }] = useAddMoneyMutation();
    const [withdrawMoney, { isLoading: isWithdrawingMoney }] =
        useWithdrawMoneyMutation();
    const [sendMoney, { isLoading: isSendingMoney }] = useSendMoneyMutation();

    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [sendAmount, setSendAmount] = useState(0);
    const [receiverEmail, setReceiverEmail] = useState("");

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
        <Card className="mb-8 bg-gradient-to-br from-primary to-chart-2 text-primary-foreground border-0">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary-foreground">
                    <Wallet className="h-5 w-5" />
                    Wallet Balance
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-5xl font-bold mb-6">
                    ৳{balance?.toLocaleString() || "0"}
                </p>
                <div className="flex flex-wrap gap-3">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="gap-2">
                                <ArrowDownLeft className="h-4 w-4" />
                                Deposit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md p-8">
                            <DialogHeader>
                                <DialogTitle>Deposit Money</DialogTitle>
                                <DialogDescription>Add money to your wallet</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="deposit-amount">Amount</Label>
                                    <Input
                                        id="deposit-amount"
                                        type="number"
                                        placeholder="Enter amount"
                                        className="h-11"
                                        onChange={(e) => setDepositAmount(Number(e.target.value))}
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
                            <Button variant="secondary" className="gap-2">
                                <ArrowUpRight className="h-4 w-4" />
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
                                        onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                                    />
                                </div>
                                <Button
                                    className="w-full h-11 text-base"
                                    onClick={handleWithdraw}
                                    disabled={isWithdrawingMoney}
                                >
                                    {isWithdrawingMoney ? "Withdrawing..." : "Confirm Withdrawal"}
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
                        <DialogContent className="sm:max-w-md p-8">
                            <DialogHeader>
                                <DialogTitle>Send Money</DialogTitle>
                                <DialogDescription>Transfer money to another user</DialogDescription>
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
    );
}
