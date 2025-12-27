import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AgentCardProps {
    id: number | string;
    name: string;
    location: string;
    rating: number;
    status: string;
    type: string;
    image: string;
    delay?: number;
}

export function AgentCard({ id, name, location, rating, status, type, image, delay = 0 }: AgentCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
        >
            {/* Image Section with Overlay */}
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-20">
                    <Badge variant={status === "Open" ? "default" : "destructive"} className="shadow-lg backdrop-blur-md bg-opacity-90">
                        {status}
                    </Badge>
                </div>
                <div className="absolute top-4 right-4 z-20">
                    <Badge variant="outline" className="bg-background/90 backdrop-blur-md border-none text-xs font-semibold uppercase tracking-wider">
                        {type}
                    </Badge>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-grow relative">
                {/* Rating Badge Floating */}
                <div className="absolute -top-6 right-6 bg-card p-2 rounded-xl shadow-lg border border-border flex items-center gap-1 z-20">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-sm">{rating}</span>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {location}
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                        Verified Agent
                    </span>
                    <Link to={`/agents/${id}`}>
                        <Button size="sm" variant="ghost" className="group/btn gap-1 hover:bg-primary/10 hover:text-primary p-0 h-auto font-medium">
                            Details
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* Decorative Gradient Line at Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </motion.div>
    );
}
