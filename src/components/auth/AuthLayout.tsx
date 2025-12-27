
import { Wallet } from "lucide-react";
import { Link } from "react-router";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    quote?: string;
    author?: string;
}

export function AuthLayout({
    children,
    title,
    description,
    quote = "The future of digital finance is here.",
    author = "Cashyo Team",
}: AuthLayoutProps) {
    return (
        <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-primary" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-primary font-bold text-sm">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-semibold">Cashyo</span>
                    </Link>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">&ldquo;{quote}&rdquo;</p>
                        <footer className="text-sm">{author}</footer>
                    </blockquote>
                </div>
            </div>
            <div className="flex items-center justify-center lg:p-8 h-full overflow-y-auto">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-10">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
