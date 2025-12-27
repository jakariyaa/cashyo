import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
      {/* Colorful Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary/50" />

      {/* Abstract shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Join the financial revolution
          </div>

          <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Ready to Transform Your <br /> Financial Life?
          </h2>

          <p className="mx-auto max-w-xl text-lg leading-8 text-white/90 mb-10">
            Join millions of users who trust Cashyo for their daily financial needs.
            Experience zero fees, instant transfers, and 24/7 support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-primary font-bold h-14 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Link to="/register" className="flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent h-14 px-8 rounded-full text-lg"
            >
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/70">
            No credit card required · Free 14-day trial · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
