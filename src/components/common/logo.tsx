import { Wallet } from "lucide-react";
import { Link } from "react-router";

export function Logo({ className }: { className?: string }) {
    return (
        <Link to="/" className={`flex items-center gap-2 group ${className}`}>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-emerald-400 text-white font-bold shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/40 group-hover:-rotate-3">
                <Wallet className="h-6 w-6" />
                <div className="absolute inset-0 rounded-xl bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:text-primary transition-colors duration-300">
                Cashyo
            </span>
        </Link>
    );
}
