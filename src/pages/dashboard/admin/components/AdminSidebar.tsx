
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { LayoutDashboard, Users, CreditCard, PieChart, Settings, FileText, ShieldAlert } from "lucide-react";
import { Logo } from "@/components/common/logo";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function AdminSidebar({ className, activeTab, onTabChange }: SidebarProps) {
    const items = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "users", label: "Users & Agents", icon: Users },
        { id: "transactions", label: "Transactions", icon: CreditCard },
        { id: "analytics", label: "Analytics", icon: PieChart },
        { id: "logs", label: "Audit Logs", icon: FileText },
        { id: "security", label: "Security", icon: ShieldAlert },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className={cn("pb-12 w-64 border-r pr-6 hidden lg:block", className)}>
            <div className="space-y-4 py-4">
                <div className="px-4 py-2">
                    <Logo />
                </div>
                <div className="py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Menu
                    </h2>
                    <div className="space-y-1">
                        {items.map((item) => (
                            item.id === "settings" ? (
                                <Link
                                    key={item.id}
                                    to="/dashboard/profile"
                                    className={cn(
                                        "w-full justify-start gap-2 inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground",
                                        activeTab === item.id && "bg-secondary text-secondary-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ) : (
                                <Button
                                    key={item.id}
                                    variant={activeTab === item.id ? "secondary" : "ghost"}
                                    className="w-full justify-start gap-2"
                                    onClick={() => onTabChange(item.id)}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Button>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
