import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { clearCredentials } from "@/redux/features/auth/userSlice";
import type { RootState } from "@/redux/store";
import { Menu } from "lucide-react";
import { Logo } from "../common/logo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { ThemeToggle } from "../common/theme-toggler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNav } from "./MobileNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
  { name: "Agents", href: "/agents" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case "admin":
        return "/dashboard/admin";
      case "agent":
        return "/dashboard/agent";
      case "user":
        return "/dashboard/user";
      default:
        return "/";
    }
  };

  const dashboardLink = getDashboardLink();

  return (
    <header className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4 lg:px-6">
      <nav
        className="mx-auto flex w-full items-center justify-between rounded-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-md border border-border/50 px-6 py-3 transition-all duration-300"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Logo />
        </div>

        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>

        <div className="hidden lg:flex lg:gap-x-4 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              id={item.name.toLowerCase()}
              to={item.href}
              className={cn(
                "text-sm font-medium leading-6 transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-foreground/70"
              )}
            >
              {item.name}
            </Link>
          ))}
          {/* Dashboard Button Removed as per request */}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
          <div id="theme-toggler">
            <ThemeToggle />
          </div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image || undefined} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={dashboardLink || "/dashboard/user"}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile">Profile Management</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                id="login"
                className="text-foreground/70 hover:text-foreground"
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      <MobileNav
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
        navigation={navigation}
        user={user}
        dashboardLink={dashboardLink}
        handleLogout={handleLogout}
      />
    </header>
  );
}

