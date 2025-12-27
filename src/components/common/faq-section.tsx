import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router";

const faqs = [
    {
        question: "Is Cashyo free to use?",
        answer: "Yes, creating an account and receiving money is completely free. We charge a tiny fee only for instant transfers to other bank accounts.",
    },
    {
        question: "How do I add money to my wallet?",
        answer: "You can add money via bank transfer, credit/debit card, or by visiting any of our 50,000+ agent locations nationwide.",
    },
    {
        question: "Is my personal information secure?",
        answer: "Absolutely. We are compliant with global data protection regulations and use everyday encryption to keep your data safe.",
    },
    {
        question: "Can I use Cashyo abroad?",
        answer: "Yes! Your Cashyo card works internationally, and you can send money to over 100 countries instantly.",
    },
    {
        question: "What if I lose my phone?",
        answer: "Your account is protected by your PIN and biometrics. You can also contact support to instantly freeze your account from any device.",
    },
];

export function FAQSection() {
    return (
        <section className="py-24 bg-background">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have questions? We have answers.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-medium">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="mt-10 text-center">
                    <p className="text-muted-foreground">
                        Still have questions?{" "}
                        <Link to="/contact" className="text-primary font-semibold hover:underline">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
