
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Wallet, X } from "lucide-react";
import { Link, useLocation } from "react-router";

interface MobileNavProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    navigation: { name: string; href: string }[];
    user: any;
    dashboardLink: string | null;
    handleLogout: () => void;
}

export function MobileNav({
    open,
    setOpen,
    navigation,
    user,
    dashboardLink,
    handleLogout,
}: MobileNavProps) {
    const location = useLocation();
    const pathname = location.pathname;

    if (!open) return null;

    return (
        <div className="lg:hidden">
            <div
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border animate-in slide-in-from-right">
                <div className="flex items-center justify-between">
                    <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-sm">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-semibold text-foreground">
                            Cashyo
                        </span>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-m-2.5 rounded-md p-2.5"
                        onClick={() => setOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                    </Button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-border">
                        <div className="space-y-2 py-6">
                            {user && (
                                <div className="px-3 pb-6 mb-6 border-b border-border">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.image} alt={user.name} />
                                            <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground">{user.name}</span>
                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        "-mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium leading-7 transition-colors hover:bg-accent",
                                        pathname === item.href
                                            ? "text-primary bg-primary/10"
                                            : "text-foreground"
                                    )}
                                    onClick={() => setOpen(false)}
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
                                            ? "text-primary bg-primary/10"
                                            : "text-foreground"
                                    )}
                                    onClick={() => setOpen(false)}
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
                                        setOpen(false);
                                    }}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-foreground/70 hover:text-foreground"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Link to="/login">Sign In</Link>
                                    </Button>
                                    <Button
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                        onClick={() => setOpen(false)}
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
    );
}
