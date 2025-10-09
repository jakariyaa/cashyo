import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function CTASection() {
  return (
    <section className="bg-primary py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join millions of users who trust Cashyo for their daily financial
            needs
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              variant="secondary"
              className="text-blue-600 hover:text-white gap-2"
            >
              <Link to="/register">Start Your Journey</Link>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link to="/register">Free to get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
