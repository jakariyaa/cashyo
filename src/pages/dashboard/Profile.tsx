
import { DashboardNav } from "@/components/layout/Dashboard-Nav";
import UpdateProfileForm from "@/components/common/update-profile-form";

export default function Profile() {
    return (
        <div className="min-h-screen bg-background">
            <DashboardNav />
            <div className="container mx-auto p-6 max-w-4xl space-y-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Profile Management</h1>
                    <p className="text-muted-foreground">Manage your personal information and account preferences.</p>
                </div>

                <UpdateProfileForm />
            </div>
        </div>
    );
}
