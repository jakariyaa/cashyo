import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionWrapperProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function MotionWrapper({ children, delay = 0, className = "" }: MotionWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.8, delay: delay, ease: "easeInOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
