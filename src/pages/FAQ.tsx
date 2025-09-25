import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  HelpCircle,
  Search,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const categories = [
    {
      name: "General",
      icon: HelpCircle,
      color: "text-primary",
      faqs: [
        {
          question: "What is Cashyo?",
          answer:
            "Cashyo is a digital wallet platform that allows you to send money, pay bills, and manage your finances securely from your mobile device. It's designed to make financial transactions simple, fast, and accessible to everyone.",
        },
        {
          question: "How do I get started with Cashyo?",
          answer:
            "Getting started is easy! Simply download our app, create an account with your email or phone number, verify your identity, and you're ready to start using Cashyo. The entire process takes less than 5 minutes.",
        },
        {
          question: "Is Cashyo available in my country?",
          answer:
            "Cashyo is currently available in select countries. Please check our website or contact our support team to confirm availability in your region. We're constantly expanding to new markets.",
        },
        {
          question: "What are the system requirements?",
          answer:
            "Cashyo works on iOS 12.0+ and Android 6.0+. You can also access your account through our web platform on any modern browser.",
        },
      ],
    },
    {
      name: "Security",
      icon: Shield,
      color: "text-success",
      faqs: [
        {
          question: "How secure is my money with Cashyo?",
          answer:
            "Your security is our top priority. We use bank-level encryption, multi-factor authentication, and store your funds in secure, regulated financial institutions. Your money is protected by the same security standards used by major banks.",
        },
        {
          question: "What should I do if I lose my phone?",
          answer:
            "If you lose your phone, immediately contact our support team or log into your account from another device to temporarily disable your account. You can then reactivate it once you get a new device.",
        },
        {
          question: "How do you protect my personal information?",
          answer:
            "We follow strict data protection guidelines and never share your personal information with third parties without your consent. All data is encrypted and stored securely in compliance with international privacy standards.",
        },
      ],
    },
    {
      name: "Transactions",
      icon: CreditCard,
      color: "text-warning",
      faqs: [
        {
          question: "How long do transfers take?",
          answer:
            "Most transfers within the Cashyo network are instant. Bank transfers may take 1-3 business days depending on your bank and the destination.",
        },
        {
          question: "What are the transaction limits?",
          answer:
            "Transaction limits vary based on your account verification level and subscription plan. Basic accounts have a daily limit of ৳50,000, while verified premium accounts have higher limits.",
        },
        {
          question: "Can I cancel a transaction?",
          answer:
            "Once a transaction is completed, it cannot be cancelled. However, you can request a refund from the recipient or contact our support team if there was an error.",
        },
        {
          question: "What fees do you charge?",
          answer:
            "We offer many free services including basic transfers, bill payments, and mobile recharges. Premium features and certain transaction types may have small fees, which are always disclosed upfront.",
        },
      ],
    },
    {
      name: "Account Management",
      icon: Settings,
      color: "text-destructive",
      faqs: [
        {
          question: "How do I verify my account?",
          answer:
            "Account verification requires a government-issued ID and proof of address. Simply upload these documents through the app, and we'll review them within 24 hours.",
        },
        {
          question: "Can I have multiple accounts?",
          answer:
            "Each person can have one personal Cashyo account. However, you can create separate business accounts if you're a registered business owner.",
        },
        {
          question: "How do I close my account?",
          answer:
            "You can close your account anytime by contacting our support team. Make sure to withdraw any remaining balance before closing your account.",
        },
        {
          question: "Can I change my registered phone number or email?",
          answer:
            "Yes, you can update your contact information in the app settings. You'll need to verify the new phone number or email address for security purposes.",
        },
      ],
    },
    {
      name: "Agent Network",
      icon: Users,
      color: "text-primary",
      faqs: [
        {
          question: "How do I find nearby agents?",
          answer:
            'Use the "Find Agents" feature in the app to locate nearby cash-in/cash-out points. You can also call our helpline for assistance finding the nearest agent.',
        },
        {
          question: "How do I become a Cashyo agent?",
          answer:
            "To become an agent, you need to meet certain criteria including having a registered business, maintaining minimum cash float, and completing our training program. Contact our agent support team for more details.",
        },
        {
          question: "What documents do I need for cash-in/cash-out?",
          answer:
            "You'll need a valid government ID and your registered phone number. Some agents may require additional verification for large transactions.",
        },
      ],
    },
  ];

  const allFaqs = categories.flatMap((category) =>
    category.faqs.map((faq) => ({
      ...faq,
      category: category.name,
      icon: category.icon,
      color: category.color,
    }))
  );

  const filteredFaqs = allFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              FAQ
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Find answers to common questions about Cashyo. Can't find what
              you're looking for? Contact our support team for personalized
              help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-base"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories Overview */}
      {!searchTerm && (
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="shadow-card hover:shadow-elevated transition-shadow duration-300 cursor-pointer"
                    onClick={() => setSearchTerm(category.name.toLowerCase())}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-primary`}>
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {category.faqs.length} questions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ List */}
      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {searchTerm && (
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredFaqs.length} result
                {filteredFaqs.length !== 1 ? "s" : ""} for "{searchTerm}"
              </p>
            </div>
          )}

          <div className="space-y-4">
            {(searchTerm ? filteredFaqs : allFaqs).map((faq, index) => (
              <motion.div
                key={`${faq.category}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-card">
                  <CardContent className="p-0">
                    <button
                      className="w-full p-6 text-left transition-colors hover:bg-accent/50"
                      onClick={() => toggleItem(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-1 rounded bg-gradient-primary">
                            <faq.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground pr-4">
                              {faq.question}
                            </h3>
                            {searchTerm && (
                              <Badge variant="outline" className="mt-2 text-xs">
                                {faq.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {openItems.includes(index) ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </button>
                    {openItems.includes(index) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="pl-8">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try searching with different keywords or browse our categories
                above.
              </p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Still Have Questions?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Our support team is here to help. Get in touch and we'll respond
              quickly.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-primary text-white hover:opacity-90 px-8 py-3 text-lg"
                >
                  Contact Support
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
