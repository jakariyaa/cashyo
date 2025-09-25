import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Personal",
      price: "Free",
      period: "Forever",
      description: "Perfect for personal use and everyday transactions",
      features: [
        "Send & receive money",
        "Basic transaction history",
        "20 free transfers per month",
        "Mobile app access",
        "Basic customer support",
        "Standard security features",
        "Community access",
        "Regular updates",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: "৳99",
      period: "per month",
      description: "Enhanced features for power users and small businesses",
      features: [
        "Everything in Personal",
        "Unlimited free transfers",
        "Advanced analytics",
        "Priority customer support",
        "Higher transaction limits",
        "Expense categorization",
        "Export transaction reports",
        "Business payment tools",
      ],
      buttonText: "Start Premium",
      popular: true,
    },
    {
      name: "Business",
      price: "৳499",
      period: "per month",
      description: "Comprehensive solution for growing businesses",
      features: [
        "Everything in Premium",
        "Multi-user access",
        "Team management",
        "Advanced reporting",
        "API access",
        "Bulk payment processing",
        "Custom integration support",
        "Dedicated account manager",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  const transactionFees = [
    {
      type: "Send Money (Personal)",
      fee: "Free up to ৳5,000/day",
      additional: "0.5% above limit",
    },
    {
      type: "Cash-In via Agent",
      fee: "1% of amount",
      additional: "Minimum ৳2",
    },
    {
      type: "Cash-Out via Agent",
      fee: "1.5% of amount",
      additional: "Minimum ৳5",
    },
    {
      type: "Bill Payments",
      fee: "Free",
      additional: "",
    },
    {
      type: "Mobile Recharge",
      fee: "Free",
      additional: "",
    },
    {
      type: "Bank Transfer",
      fee: "৳10 per transaction",
      additional: "",
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No, we believe in transparent pricing. All fees are clearly listed and there are no hidden charges.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and bank transfers for subscription payments.",
    },
    {
      question: "Is there a free trial for premium plans?",
      answer:
        "Yes, we offer a 14-day free trial for both Premium and Business plans.",
    },
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
              Pricing
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Choose the plan that works best for you. Start with our free plan
              and upgrade as your needs grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full shadow-card hover:shadow-elevated transition-shadow duration-300 ${
                    plan.popular ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground ml-2">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                          <span className="text-sm text-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/register" className="block">
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-primary text-white hover:opacity-90"
                            : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Fees */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Transaction Fees
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Transparent pricing for all transaction types
            </p>
          </motion.div>

          <div className="mt-12">
            <Card className="shadow-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Transaction Type
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Fee
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Additional Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {transactionFees.map((fee, index) => (
                        <motion.tr
                          key={fee.type}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <td className="px-6 py-4 text-sm text-foreground">
                            {fee.type}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-primary">
                            {fee.fee}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {fee.additional}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Got questions? We've got answers.
            </p>
          </motion.div>

          <div className="mt-12 space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
              Join thousands of satisfied users and experience the future of
              digital payments
            </p>
            <div className="mt-8">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-3 text-lg"
                >
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
