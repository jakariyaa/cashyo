import {
    BentoGrid,
    BentoGridItem,
} from "@/components/ui/bento-grid";
import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export function FeaturesBento() {
    return (
        <section className="py-24 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                    Everything you need for your financial journey
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Experience a new standard in digital banking with our comprehensive suite of powerful features.
                </p>
            </div>

            <BentoGrid className="max-w-4xl mx-auto">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </section>
    );
}

// Visual Components
const TransferVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-muted/50 to-card dark:from-muted dark:to-background border border-border/50 overflow-hidden relative items-center justify-center">
        <div className="absolute inset-0 bg-dot-black/[0.1] dark:bg-dot-white/[0.1]" />
        <motion.div
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="z-10 bg-primary/20 p-2 rounded-full"
        >
            <div className="w-8 h-8 rounded-full bg-primary" />
        </motion.div>
        <div className="absolute h-1 w-3/4 bg-muted-foreground/20 rounded-full" />
    </div>
);

const WalletVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-muted/30 border border-border/50 relative overflow-hidden items-center justify-center group">
        <motion.div
            whileHover={{ rotate: -10, y: -5 }}
            className="w-24 h-16 rounded-lg bg-red-400 absolute z-10 shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/20"
        />
        <motion.div
            whileHover={{ rotate: 5, y: -5 }}
            className="w-24 h-16 rounded-lg bg-primary absolute z-20 shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%+10px)] border border-white/20"
        />
    </div>
);

const AnalyticsVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-muted/30 border border-border/50 relative items-end justify-center gap-2 pb-4 overflow-hidden">
        {[40, 70, 50, 90, 65].map((h, i) => (
            <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-4 bg-primary/80 rounded-t-sm"
            />
        ))}
    </div>
);

const ShieldVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-tr from-emerald-50 to-muted/50 dark:from-emerald-900/20 dark:to-muted border border-border/50 relative items-center justify-center overflow-hidden">
        <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
        >
            <div className="w-10 h-10 bg-primary rounded-full blur-[2px] opacity-50 absolute" />
            <div className="w-8 h-8 bg-primary rounded-full relative z-10" />
        </motion.div>
    </div>
)

const NetworkVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-muted/30 border border-border/50 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-4 p-4 opacity-30">
            {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
            ))}
        </div>
        <div className="absolute w-24 h-24 bg-primary/10 rounded-full blur-xl z-0" />
    </div>
);

const AppVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-muted/30 border border-border/50 relative items-center justify-center overflow-hidden">
        <div className="w-32 h-48 bg-card border-4 border-muted rounded-2xl shadow-xl transform rotate-90 md:rotate-0 mt-8 relative overflow-hidden">
            <div className="w-full h-4 bg-muted border-b border-border/50" />
            <div className="p-4 space-y-2">
                <div className="w-3/4 h-2 bg-muted/50 rounded" />
                <div className="w-1/2 h-2 bg-muted/50 rounded" />
                <div className="w-full h-20 bg-primary/10 rounded mt-4" />
            </div>
        </div>
    </div>
);

const SupportVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-muted/30 border border-border/50 relative items-center justify-center overflow-hidden">
        <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -20, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, x: -10, y: 10 }}
            transition={{ duration: 0.5 }}
            className="absolute w-20 h-12 bg-muted rounded-xl rounded-bl-sm flex items-center justify-center z-0 border border-border/50"
        >
            <div className="w-10 h-2 bg-muted-foreground/20 rounded-full" />
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 20, y: -10 }}
            whileInView={{ opacity: 1, scale: 1, x: 10, y: -10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute w-20 h-12 bg-primary rounded-xl rounded-tr-sm flex items-center justify-center z-10 border-2 border-background shadow-lg"
        >
            <div className="w-10 h-2 bg-white/30 rounded-full" />
        </motion.div>
    </div>
);


const items = [
    {
        title: "Instant Transfers",
        description: "Send money globally in seconds with zero hidden fees.",
        header: <TransferVisual />,
        icon: <IconClipboardCopy className="h-4 w-4 text-muted-foreground" />,
    },
    {
        title: "Digital Wallet",
        description: "Store, manage, and exchange multiple currencies.",
        header: <WalletVisual />,
        icon: <IconFileBroken className="h-4 w-4 text-muted-foreground" />,
    },
    {
        title: "Smart Analytics",
        description: "Track your spending habits with AI-powered insights.",
        header: <AnalyticsVisual />,
        icon: <IconSignature className="h-4 w-4 text-muted-foreground" />,
    },
    {
        title: "Secure Payments",
        description:
            "Bank-grade encryption ensures your money is always safe.",
        header: <ShieldVisual />,
        icon: <IconTableColumn className="h-4 w-4 text-muted-foreground" />,
    },
    {
        title: "Agent Network",
        description: "Cash in/out easily through our verified agent network.",
        header: <NetworkVisual />,
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-muted-foreground" />,
    },
    {
        title: "24/7 Support",
        description: "Our dedicated team is here to help you anytime, anywhere.",
        header: <SupportVisual />,
        icon: <IconBoxAlignTopLeft className="h-4 w-4 text-muted-foreground" />,
    },
    {
        title: "Mobile App",
        description: "Manage your finances on the go with our top-rated app.",
        header: <AppVisual />,
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-muted-foreground" />,
    },
];
