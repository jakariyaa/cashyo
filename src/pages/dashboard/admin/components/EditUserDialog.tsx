import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
import type { User, Wallet } from "@/types/admin-dashboard";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface EditUserDialogProps {
    user: User | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (user: User) => void;
    onBlockWallet: (walletId: string, isActive: boolean) => void;
    wallets: Wallet[];
}

export function EditUserDialog({
    user,
    isOpen,
    onOpenChange,
    onSave,
    onBlockWallet,
    wallets,
}: EditUserDialogProps) {
    const [editedUser, setEditedUser] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            setEditedUser(user);
        }
    }, [user]);

    if (!editedUser) return null;

    const userWallet = wallets.find((w) => w.userId._id === editedUser._id);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>Update user information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                    <div>
                        <Label>Name</Label>
                        <Input
                            value={editedUser.name}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            value={editedUser.email}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <Label>Role</Label>
                        <Select
                            value={editedUser.role}
                            onValueChange={(value) =>
                                setEditedUser({
                                    ...editedUser,
                                    role: value as "user" | "agent",
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="agent">Agent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Status</Label>
                        <Select
                            value={editedUser.isActive ? "active" : "suspended"}
                            onValueChange={(value) =>
                                setEditedUser({
                                    ...editedUser,
                                    isActive: value === "active",
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full" onClick={() => onSave(editedUser)}>
                        Save Changes
                    </Button>
                    {userWallet && (
                        <div className="flex justify-between items-center border-t pt-4">
                            <span className="text-sm text-muted-foreground">User Wallet: {userWallet.isActive ? 'Active' : 'Blocked'}</span>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive border-destructive hover:bg-destructive/10"
                                onClick={() => onBlockWallet(userWallet._id, userWallet.isActive)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {userWallet.isActive ? "Block Wallet" : "Unblock Wallet"}
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
