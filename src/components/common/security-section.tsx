import { motion } from "framer-motion";
import { Shield, Lock, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const securityFeatures = [
    "End-to-end encryption for all data",
    "Real-time fraud detection monitoring",
    "Biometric authentication support",
    "PCI DSS Level 1 Compliant",
    "24/7 Security Operations Center",
    "Instant transaction alerts"
];

export function SecuritySection() {
    return (
        <section className="py-24 bg-secondary/30 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                            <Shield className="w-4 h-4 mr-2" />
                            Unmatched Security
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                            Your Money is Safe with Us
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            We use bank-grade security protocols to ensure your funds and personal information are always protected. Sleep soundly knowing Cashyo has your back.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {securityFeatures.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="text-foreground/90 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Link to="/security">Learn about our Security</Link>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Abstract visualization of security */}
                        <div className="relative aspect-square w-full max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />

                            <div className="relative z-10 bg-card border border-border p-8 rounded-3xl shadow-2xl h-full flex flex-col items-center justify-center text-center">
                                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-8 relative">
                                    <Lock className="w-16 h-16 text-primary" />
                                    <div className="absolute -right-4 -top-4 bg-background p-3 rounded-xl shadow-lg border border-border animate-bounce">
                                        <Eye className="w-6 h-6 text-blue-500" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">Secure Vault</h3>
                                <p className="text-muted-foreground mb-6">Active Protection Enabled</p>
                                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                                    <div className="bg-primary w-full h-full animate-[shimmer_2s_infinite]" style={{
                                        backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)'
                                    }} />
                                </div>
                                <div className="mt-2 text-xs text-primary font-mono">ENCRYPTED CONNECTION</div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
