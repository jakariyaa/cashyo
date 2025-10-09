import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { clearCredentials } from "@/redux/features/auth/userSlice";
import type { RootState } from "@/redux/store";
import { Menu, Wallet, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { ThemeToggle } from "../common/theme-toggler";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
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
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link id="home" to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold text-sm">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Cashyo
            </span>
          </Link>
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

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              id={item.name.toLowerCase()}
              to={item.href}
              className={cn(
                "text-sm font-medium leading-6 transition-colors hover:text-blue-600",
                pathname === item.href ? "text-blue-600" : "text-foreground/70"
              )}
            >
              {item.name}
            </Link>
          ))}
          {user && dashboardLink && (
            <Link
              to={dashboardLink}
              className={cn(
                "text-sm font-medium leading-6 transition-colors hover:text-blue-600",
                pathname.startsWith("/dashboard")
                  ? "text-blue-600"
                  : "text-foreground/70"
              )}
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
          <div id="theme-toggler">
            <ThemeToggle />
          </div>
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/70 hover:text-foreground"
              onClick={handleLogout}
            >
              Logout
            </Button>
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
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      {}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold text-sm">
                  C
                </div>
                <span className="text-xl font-semibold text-foreground">
                  Cashyo
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="-m-2.5 rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "-mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium leading-7 transition-colors hover:bg-accent",
                        pathname === item.href
                          ? "text-blue-600 bg-blue-50 dark:bg-blue-950/20"
                          : "text-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {user && dashboardLink && (
                    <Link
                      to={dashboardLink}
                      className={cn(
                        "-mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium leading-7 transition-colors hover:bg-accent",
                        pathname.startsWith("/dashboard")
                          ? "text-blue-600 bg-blue-50 dark:bg-blue-950/20"
                          : "text-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
                <div className="py-6 space-y-2">
                  {user ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-foreground/70 hover:text-foreground"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-foreground/70 hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link to="/login">Sign In</Link>
                      </Button>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link to="/register">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
