import { Shield, Zap, Smartphone, CreditCard, BarChart3, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "framer-motion";

const features = [
  {
    name: "Bank-Level Security",
    description: "Your money is protected with advanced encryption and multi-factor authentication.",
    icon: Shield,
  },
  {
    name: "Instant Transfers",
    description: "Send and receive money instantly with zero delays around the globe.",
    icon: Zap,
  },
  {
    name: "Agent Network",
    description: "Cash-in and cash-out at thousands of agent locations nationwide.",
    icon: Smartphone,
  },
  {
    name: "Digital Payments",
    description: "Pay bills, shop online, and manage all your payments in one place.",
    icon: CreditCard,
  },
  {
    name: "Financial Insights",
    description: "Track your spending with detailed analytics and smart budgeting tools.",
    icon: BarChart3,
  },
  {
    name: "24/7 Support",
    description: "Access your wallet anytime, anywhere with our reliable platform support.",
    icon: Clock,
  },
];

export function Features() {
  return (
    <section id="features-preview" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary uppercase tracking-wide">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to manage your money
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We've built a comprehensive ecosystem to handle all your financial needs in one secure app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-24 h-24 text-primary" />
                </div>

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{feature.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all cursor-pointer">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="rounded-full px-8">
            <Link to="/features">View All Features</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
