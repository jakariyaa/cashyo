import { DashboardNav } from "@/components/layout/Dashboard-Nav";
import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useBlockWalletMutation,
  useGetAllTransactionsQuery,
  useGetAllUsersQuery,
  useGetAllWalletsQuery,
  useUpdateUserMutation,
} from "@/redux/features/dashboard/adminApi";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Edit,
  Filter,
  Settings,
  Trash2,
  UserCog,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "agent";
  isActive: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Wallet {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  walletId: string;
  balance: number;
  isActive: boolean;
  dailyLimit: number;
  monthlyLimit: number;
  dailyAmountUsed: number;
  monthlyAmountUsed: number;
  lastResetDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  fee: number;
  feeType: string;
  feeValue: number;
  fromWalletId: {
    _id: string;
    userId: string;
    balance: number;
  };
  toWalletId: {
    _id: string;
    userId: string;
    balance: number;
  };
  initiatedBy: {
    _id: string;
    name: string;
    email: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: walletsData, isLoading: walletsLoading } =
    useGetAllWalletsQuery();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetAllTransactionsQuery();
  const [blockWallet] = useBlockWalletMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editedUser, setEditedUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setEditedUser(user);
  };

  const handleSaveUser = async () => {
    if (editedUser) {
      try {
        await updateUser({ id: editedUser._id, ...editedUser }).unwrap();
        toast.success("Success", { description: "User updated successfully." });
        setEditedUser(null);
      } catch {
        toast.error("Error", { description: "Failed to update user." });
      }
    }
  };

  const handleBlockWallet = async (walletId: string, isActive: boolean) => {
    try {
      await blockWallet({ id: walletId, isActive: !isActive }).unwrap();
      toast.success("Success", {
        description: "Wallet status updated successfully.",
      });
    } catch {
      toast.error("Error", { description: "Failed to update wallet status." });
    }
  };

  const [userPage, setUserPage] = useState(1);
  const [txPage, setTxPage] = useState(1);
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTxType, setFilterTxType] = useState("all");
  const [filterTxStatus, setFilterTxStatus] = useState("all");
  const itemsPerPage = 5;

  const filteredUsers =
    usersData?.data?.filter((user: User) => {
      const roleMatch = filterRole === "all" || user.role === filterRole;
      const statusMatch =
        filterStatus === "all" ||
        (user.isActive ? "active" : "suspended") === filterStatus;
      return roleMatch && statusMatch;
    }) || [];

  const filteredTransactions =
    transactionsData?.data?.filter((tx: Transaction) => {
      const typeMatch = filterTxType === "all" || tx.type === filterTxType;
      const statusMatch =
        filterTxStatus === "all" || tx.status === filterTxStatus;
      return typeMatch && statusMatch;
    }) || [];

  const userTotalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const userStartIndex = (userPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    userStartIndex,
    userStartIndex + itemsPerPage
  );

  const txTotalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const txStartIndex = (txPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    txStartIndex,
    txStartIndex + itemsPerPage
  );

  if (usersLoading || walletsLoading || transactionsLoading) {
    return <div>Loading...</div>;
  }

  const systemStats = {
    totalUsers: usersData?.data?.length || 0,
    totalAgents:
      usersData?.data?.filter((user: User) => user.role === "agent").length ||
      0,
    totalTransactions: transactionsData?.data?.length || 0,
    totalVolume:
      transactionsData?.data?.reduce(
        (acc: number, tx: Transaction) => acc + tx.amount,
        0
      ) || 0,
    activeUsers:
      usersData?.data?.filter((user: User) => user.isActive).length || 0,
    systemHealth: 98.5,
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto p-6 max-w-7xl">
        {}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            System overview and management
          </p>
        </div>

        {}
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

        {}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users & Agents</TabsTrigger>
            <TabsTrigger value="transactions">All Transactions</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
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
                  <Label htmlFor="filter-role">Role</Label>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger id="filter-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {}
            <Card>
              <CardHeader>
                <CardTitle>Manage Users & Agents</CardTitle>
                <CardDescription>
                  View and manage all system users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.map((user: User) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "agent" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.isActive ? "default" : "destructive"}
                          >
                            {user.isActive ? "Active" : "Suspended"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          ৳
                          {walletsData.data
                            .find(
                              (wallet: Wallet) => wallet.userId._id === user._id
                            )
                            ?.balance.toLocaleString() || 0}
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog
                              open={!!editedUser}
                              onOpenChange={() => setEditedUser(null)}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditUser(user)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit User</DialogTitle>
                                  <DialogDescription>
                                    Update user information
                                  </DialogDescription>
                                </DialogHeader>
                                {editedUser && (
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
                                          <SelectItem value="user">
                                            User
                                          </SelectItem>
                                          <SelectItem value="agent">
                                            Agent
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label>Status</Label>
                                      <Select
                                        value={
                                          editedUser.isActive
                                            ? "active"
                                            : "suspended"
                                        }
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
                                          <SelectItem value="active">
                                            Active
                                          </SelectItem>
                                          <SelectItem value="suspended">
                                            Suspended
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <Button
                                      className="w-full"
                                      onClick={handleSaveUser}
                                    >
                                      Save Changes
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() =>
                                handleBlockWallet(
                                  walletsData.data.find(
                                    (wallet: Wallet) =>
                                      wallet.userId._id === user._id
                                  )?._id,
                                  walletsData.data.find(
                                    (wallet: Wallet) =>
                                      wallet.userId._id === user._id
                                  )?.isActive
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {userStartIndex + 1}-
                    {Math.min(
                      userStartIndex + itemsPerPage,
                      filteredUsers.length
                    )}{" "}
                    of {filteredUsers.length}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                      disabled={userPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setUserPage((p) => Math.min(userTotalPages, p + 1))
                      }
                      disabled={userPage === userTotalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                  <Label htmlFor="filter-tx-type">Transaction Type</Label>
                  <Select value={filterTxType} onValueChange={setFilterTxType}>
                    <SelectTrigger id="filter-tx-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="deposit">Deposit</SelectItem>
                      <SelectItem value="withdraw">Withdraw</SelectItem>
                      <SelectItem value="send">Send</SelectItem>
                      <SelectItem value="cash-in">Cash-In</SelectItem>
                      <SelectItem value="cash-out">Cash-Out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor="filter-tx-status">Status</Label>
                  <Select
                    value={filterTxStatus}
                    onValueChange={setFilterTxStatus}
                  >
                    <SelectTrigger id="filter-tx-status">
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
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>
                  Monitor all system transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTransactions.map((tx: Transaction) => (
                      <TableRow key={tx._id}>
                        <TableCell className="font-mono text-sm">
                          #{tx._id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {tx.initiatedBy.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{tx.type}</Badge>
                        </TableCell>
                        <TableCell className="font-bold">
                          ৳{tx.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tx.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {txStartIndex + 1}-
                    {Math.min(
                      txStartIndex + itemsPerPage,
                      filteredTransactions.length
                    )}{" "}
                    of {filteredTransactions.length}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTxPage((p) => Math.max(1, p - 1))}
                      disabled={txPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setTxPage((p) => Math.min(txTotalPages, p + 1))
                      }
                      disabled={txPage === txTotalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>Adjust system-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable user access
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New User Registration</p>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to sign up
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Agent Applications</p>
                    <p className="text-sm text-muted-foreground">
                      Accept new agent applications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Limits</CardTitle>
                <CardDescription>
                  Set minimum and maximum transaction amounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min-deposit">Minimum Deposit</Label>
                    <Input id="min-deposit" type="number" defaultValue="100" />
                  </div>
                  <div>
                    <Label htmlFor="max-deposit">Maximum Deposit</Label>
                    <Input
                      id="max-deposit"
                      type="number"
                      defaultValue="100000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="min-withdraw">Minimum Withdrawal</Label>
                    <Input id="min-withdraw" type="number" defaultValue="500" />
                  </div>
                  <div>
                    <Label htmlFor="max-withdraw">Maximum Withdrawal</Label>
                    <Input
                      id="max-withdraw"
                      type="number"
                      defaultValue="50000"
                    />
                  </div>
                </div>
                <Button>Save Limits</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Commission Rates</CardTitle>
                <CardDescription>
                  Configure agent commission percentages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cashin-rate">Cash-In Commission (%)</Label>
                    <Input
                      id="cashin-rate"
                      type="number"
                      step="0.1"
                      defaultValue="1.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cashout-rate">
                      Cash-Out Commission (%)
                    </Label>
                    <Input
                      id="cashout-rate"
                      type="number"
                      step="0.1"
                      defaultValue="1.5"
                    />
                  </div>
                </div>
                <Button>Update Rates</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
