import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Clock,
  CreditCard,
  Globe,
  Headphones,
  Lock,
  MapPin,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const mainFeatures = [
    {
      icon: Shield,
      title: "Advanced Security",
      description:
        "Military-grade encryption, biometric authentication, and fraud detection keep your money safe.",
      features: [
        "256-bit SSL encryption",
        "Biometric login",
        "Real-time fraud monitoring",
        "Two-factor authentication",
      ],
    },
    {
      icon: Zap,
      title: "Instant Transactions",
      description:
        "Send and receive money in seconds with our lightning-fast transaction processing.",
      features: [
        "Real-time transfers",
        "Zero processing delays",
        "24/7 availability",
        "Instant notifications",
      ],
    },
    {
      icon: Users,
      title: "Vast Agent Network",
      description:
        "Access cash services at over 50,000 agent locations across the country.",
      features: [
        "50K+ agent points",
        "Nationwide coverage",
        "Easy cash-in/out",
        "Location finder",
      ],
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description:
        "Get insights into your spending patterns with detailed financial analytics.",
      features: [
        "Spending categorization",
        "Budget tracking",
        "Savings goals",
        "Monthly reports",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: CreditCard,
      title: "Bill Payments",
      description:
        "Pay all your utility bills, mobile recharges, and subscriptions in one place.",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description:
        "Designed for mobile with an intuitive interface that works on any device.",
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description:
        "Your personal data is encrypted and never shared without your consent.",
    },
    {
      icon: BarChart3,
      title: "Financial Reports",
      description:
        "Download detailed transaction reports for personal or business use.",
    },
    {
      icon: MapPin,
      title: "Location Services",
      description:
        "Find nearby agents and ATMs with our integrated location services.",
    },
    {
      icon: Clock,
      title: "Transaction History",
      description:
        "Access complete transaction history with advanced search and filtering.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support via chat, email, and phone.",
    },
    {
      icon: Globe,
      title: "Multi-language",
      description:
        "Available in multiple languages to serve diverse communities.",
    },
  ];

  const securityFeatures = [
    "End-to-end encryption for all transactions",
    "Multi-factor authentication",
    "Biometric security (fingerprint & face recognition)",
    "Real-time fraud detection and prevention",
    "Secure PIN and pattern locks",
    "Automatic session timeouts",
    "Device registration and management",
    "Transaction limits and controls",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Everything You Need for
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {" "}
                Digital Banking
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Discover all the powerful features that make Cashyo the most
              comprehensive digital wallet solution for your financial needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:gap-16">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid gap-8 lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div
                  className={`space-y-6 ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {feature.title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <Card className="p-8 shadow-elevated">
                    <CardContent className="p-0">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <feature.icon className="h-24 w-24 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              More Powerful Features
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Comprehensive tools to manage your financial life
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-card hover:shadow-elevated transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Focus */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">
                  Security You Can Trust
                </h2>
              </div>
              <p className="text-lg text-muted-foreground">
                Your security is our top priority. We employ multiple layers of
                protection to ensure your money and personal information are
                always safe.
              </p>
              <div className="grid gap-3">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 shadow-elevated">
                <CardContent className="p-0">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-success/10 to-success/5 flex items-center justify-center">
                    <Lock className="h-32 w-32 text-success" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Experience These Features?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
              Join millions of users who trust Cashyo for their digital
              financial needs
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-3 text-lg"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-primary"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;
