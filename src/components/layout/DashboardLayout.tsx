import { cn } from "@/lib/utils"; // If you have a classnames utility
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Overview", href: "/dashboard/user" },
  { label: "Deposit", href: "/dashboard/user?tab=deposit" },
  { label: "Withdraw", href: "/dashboard/user?tab=withdraw" },
  { label: "Send Money", href: "/dashboard/user?tab=send" },
  { label: "Transactions", href: "/dashboard/user?tab=transactions" },
  { label: "Profile", href: "/dashboard/user?tab=profile" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col py-6 px-4">
        <h2 className="text-xl font-bold mb-8 text-primary">My Wallet</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-4 py-2 rounded hover:bg-primary/10 transition",
                location.pathname + location.search === item.href
                  ? "bg-primary/10 font-semibold"
                  : ""
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Cashyo
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
