import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
const faqs = [
  {
    question: "How secure is Cashyo?",
    answer:
      "Cashyo uses bank-grade security with multi-layer encryption, biometric authentication, and hardware security modules. We employ zero-knowledge architecture to ensure your financial data remains completely private. Our security measures are regularly audited by third-party security firms.",
  },
  {
    question: "What currencies does Cashyo support?",
    answer:
      "We support over 50 fiat currencies including USD, EUR, GBP, JPY, and many more. We also support popular cryptocurrencies like Bitcoin, Ethereum, and other major digital assets. You can easily convert between currencies within the app.",
  },
  {
    question: "How long do transactions take?",
    answer:
      "Most transactions are processed instantly within our network. External transfers typically take 1-3 business days depending on the receiving bank. Cryptocurrency transactions vary based on network congestion but are usually confirmed within minutes.",
  },
  {
    question: "What are the fees for using Cashyo?",
    answer:
      "Our Personal plan is completely free for up to 10 transactions per month. The Pro plan is $9.99/month with unlimited transactions and advanced features. Business plans start at $29.99/month. There are no hidden fees or setup costs.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Yes! Cashyo is available on both iOS and Android. The mobile app includes all the features of the web platform, plus additional mobile-specific features like QR code payments and biometric authentication.",
  },
  {
    question: "Can I use Cashyo for business?",
    answer:
      "Our Business plan includes team management features, advanced analytics, custom integrations, and dedicated support. You can manage multiple users, set spending limits, and track business expenses all in one place.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply sign up for a free account, verify your identity (required for security), and you can start sending and receiving money immediately. The entire process takes less than 5 minutes.",
  },
  {
    question: "What if I forget my password or lose my device?",
    answer:
      "We have multiple recovery options including email recovery, SMS verification, and security questions. If you lose your device, you can immediately freeze your account from any other device or by contacting our support team.",
  },
  {
    question: "Is my money insured?",
    answer:
      "Yes, funds in Cashyo are insured up to $250,000 per account through our partnership with FDIC-insured banks. Cryptocurrency holdings are protected through our comprehensive insurance policy with leading crypto insurers.",
  },
  {
    question: "Can I integrate Cashyo with other apps?",
    answer:
      "Yes! We offer a comprehensive API that allows you to integrate Cashyo with your existing apps and services. Our API supports payments, account management, and transaction history. Documentation and SDKs are available for popular programming languages.",
  },
];

export function FaqList() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-foreground">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-7">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Still have questions?
          </h3>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Our support team is here to help you 24/7.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="mailto:support@cashyo.com">Email Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
