import { DashboardNav } from "@/components/layout/Dashboard-Nav";
import {
  useBlockWalletMutation,
  useGetAllTransactionsQuery,
  useGetAllUsersQuery,
  useGetAllWalletsQuery,
  useUpdateUserMutation,
} from "@/redux/features/dashboard/adminApi";
import type { User } from "@/types/admin-dashboard";
import { getErrorMessage } from "@/utils/error";
import { useState } from "react";
import { toast } from "sonner";
import { EditUserDialog } from "./components/EditUserDialog";
import { StatsCards } from "./components/StatsCards";
import { TransactionTable } from "./components/TransactionTable";
import { UserTable } from "./components/UserTable";
import { DashboardSkeleton } from "@/components/common/DashboardSkeleton";
import { DashboardCharts } from "./components/DashboardCharts";
import { AdminSidebar } from "./components/AdminSidebar";

export default function AdminDashboard() {
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: walletsData, isLoading: walletsLoading } =
    useGetAllWalletsQuery();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetAllTransactionsQuery();
  const [blockWallet] = useBlockWalletMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditUser = (user: User) => {
    setEditedUser(user);
    setIsDialogOpen(true);
  };

  const handleSaveUser = async (user: User) => {
    try {
      await updateUser({ id: user._id, ...user }).unwrap();
      toast.success("Success", { description: "User updated successfully." });
      setEditedUser(null);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Error", { description: getErrorMessage(error) });
    }
  };

  const handleBlockWallet = async (walletId: string, isActive: boolean) => {
    try {
      await blockWallet({ id: walletId, isActive: !isActive }).unwrap();
      toast.success("Success", {
        description: "Wallet status updated successfully.",
      });
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Error", { description: getErrorMessage(error) });
    }
  };

  const [activeTab, setActiveTab] = useState("overview");

  if (usersLoading || walletsLoading || transactionsLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto p-6 max-w-7xl flex gap-6">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-foreground capitalize">
              {activeTab === "overview" ? "Admin Dashboard" : activeTab}
            </h1>
            <p className="text-muted-foreground">
              Overview of system performance and management
            </p>
          </div>

          {/* Content Switcher */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <StatsCards
                usersData={usersData?.data || []}
                transactionsData={transactionsData?.data || []}
              />
              <DashboardCharts />
            </div>
          )}

          {activeTab === "users" && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
              <UserTable
                users={usersData?.data || []}
                wallets={walletsData?.data || []}
                onEditUser={handleEditUser}
              />
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
              <TransactionTable transactions={transactionsData?.data || []} />
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
              <DashboardCharts />
            </div>
          )}

          {(activeTab === "logs" || activeTab === "security" || activeTab === "settings") && (
            <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-muted/20 animate-in fade-in">
              <p className="text-muted-foreground">Module under development.</p>
            </div>
          )}
        </div>

        <EditUserDialog
          user={editedUser}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSave={handleSaveUser}
          onBlockWallet={handleBlockWallet}
          wallets={walletsData?.data || []}
        />
      </div>
    </div>
  );
}
