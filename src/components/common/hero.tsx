import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 dark:from-blue-950/20 via-background to-blue-50 dark:to-blue-950/20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
            Your Money, <span className="text-blue-600">Simplified</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty max-w-2xl mx-auto">
            Experience the future of digital payments with Cashyo. Send money,
            pay bills, and manage your finances with bank-level security and
            instant transactions.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Link to="/register">Get Started Free</Link>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-foreground border-border hover:bg-accent"
            >
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
