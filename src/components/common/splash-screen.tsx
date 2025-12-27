import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [exit, setExit] = useState(false);

    useEffect(() => {
        // Significantly reduced delay for "immediate" feel, or just enough to show the animation once
        const timer = setTimeout(() => {
            setExit(true);
            setTimeout(onComplete, 300); // reduced from 500 to 300 for snappier exit
        }, 800); // Reduced from 2000 to 800ms

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={exit ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
            <div className="flex flex-col items-center gap-4">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    className="relative"
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                        <Wallet className="h-10 w-10" />
                    </div>
                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 0 0px hsl(var(--primary) / 0.3)",
                                "0 0 0 20px hsl(var(--primary) / 0)",
                            ],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-2xl"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Cashyo
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Global Payments Made Simple
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}
