import { motion } from "framer-motion";
import { UserPlus, Wallet, Send } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Create Account",
        description: "Sign up in minutes with just your phone number and email. No paperwork required.",
        icon: UserPlus,
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "Add Money",
        description: "Load your wallet via bank transfer, card, or at any of our 50k+ agent locations.",
        icon: Wallet,
        color: "bg-purple-500",
    },
    {
        id: 3,
        title: "Start Sending",
        description: "Send money instantly to anyone, pay bills, or shop online securely.",
        icon: Send,
        color: "bg-green-500",
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Get Started in 3 Simple Steps
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Join the cashless revolution today. It's easier than you think.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex flex-col items-center text-center bg-card p-6 rounded-2xl border border-transparent hover:border-border transition-colors relative"
                                >
                                    <div className={`w-24 h-24 rounded-full ${step.color}/10 flex items-center justify-center mb-6 relative group`}>
                                        <div className={`absolute inset-0 rounded-full ${step.color}/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                        <Icon className={`w-10 h-10 ${step.color.replace('bg-', 'text-')}`} />
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center font-bold text-sm shadow-sm">
                                            {step.id}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
