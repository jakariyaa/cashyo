import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearCredentials } from "@/redux/features/auth/userSlice";
import type { RootState } from "@/redux/store";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Logo } from "../common/logo";

export function DashboardNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/");
  };

  const dashboardPath = () => {
    switch (user?.role) {
      case "admin":
        return "/dashboard/admin";
      case "agent":
        return "/dashboard/agent";
      default:
        return "/dashboard/user";
    }
  };

  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 border border-border/50 hover:bg-muted/50">
                  <User className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border-border/50 bg-background/95 backdrop-blur-xl">
                <DropdownMenuLabel className="font-normal text-muted-foreground text-xs uppercase tracking-wider px-2 py-1.5">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="-mx-1 my-1 opacity-50" />
                <DropdownMenuItem asChild className="rounded-lg focus:bg-muted/50 cursor-pointer">
                  <Link to={dashboardPath()}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg focus:bg-muted/50 cursor-pointer">
                  <Link to="/dashboard/profile">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="-mx-1 my-1 opacity-50" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 rounded-lg cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
