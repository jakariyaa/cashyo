import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ShieldCheck, Globe } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl text-balance">
            Your Trusted Gateway to <br />
            <span className="text-foreground">Global Transactions</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty max-w-2xl mx-auto">
            An innovative payment gateway solution, designed to facilitate digital
            transactions safely, quickly and efficiently.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8 h-12 text-base"
            >
              <Link to="/register">Get Started</Link>
            </Button>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6 sm:mt-0">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm font-medium text-foreground/80 backdrop-blur-sm border border-border/50">
                <ShieldCheck className="w-4 h-4 text-primary" />
                No credit card required
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm font-medium text-foreground/80 backdrop-blur-sm border border-border/50">
                <Globe className="w-4 h-4 text-primary" />
                Trusted in 100+ Countries
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
