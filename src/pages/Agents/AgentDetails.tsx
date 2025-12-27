import { useParams, Link } from "react-router";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, Clock, ArrowLeft, ShieldCheck, Banknote, Globe, Mail } from "lucide-react";

// Mock data
const MOCK_AGENTS = {
    "1": { id: 1, name: "FastCash Point", location: "New York, NY", rating: 4.8, status: "Open", type: "Kiosk", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Conveniently located kiosk for quick cash withdrawals and deposits. Open 24/7 for your banking needs." },
    "2": { id: 2, name: "City Center Branch", location: "Los Angeles, CA", rating: 4.5, status: "Open", type: "Branch", image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", description: "Full service branch offering loans, mortgages, and personal banking assistance." },
};

export default function AgentDetails() {
    const { id } = useParams();
    // @ts-ignore
    const agent = MOCK_AGENTS[id || "1"] || MOCK_AGENTS["1"];

    return (
        <div className="min-h-screen bg-background pb-20 pt-16">
            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover absolute inset-0 z-0 blur-sm scale-105"
                />
                <div className="absolute inset-0 z-20 container mx-auto px-6 max-w-7xl flex flex-col justify-end pb-12 text-white">
                    <MotionWrapper>
                        <Link to="/agents" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Agents
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90 text-md px-4 py-1.5">{agent.type}</Badge>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{agent.name}</h1>
                                <div className="flex items-center gap-6 text-white/80">
                                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {agent.location}</span>
                                    <span className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-400 fill-current" /> {agent.rating} (124)</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold shadow-xl">
                                    <Phone className="mr-2 h-4 w-4" /> Contact Agent
                                </Button>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 max-w-7xl -mt-10 relative z-30">
                <MotionWrapper delay={0.2}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Overview Card */}
                            <div className="bg-card border rounded-3xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold mb-4">About this Agent</h2>
                                <p className="text-muted-foreground leading-loose text-lg">
                                    {agent.description} This verified location is equipped with the latest security technology to ensure your transactions are safe.
                                    Our staff is fluent in English, Spanish, and Mandarin to better serve the community.
                                </p>

                                <div className="mt-8 pt-8 border-t">
                                    <h3 className="text-xl font-semibold mb-6">Services Offered</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {[
                                            { name: "Cash Withdrawal", icon: Banknote },
                                            { name: "ID Verification", icon: ShieldCheck },
                                            { name: "Global Transfer", icon: Globe },
                                            { name: "Currency Exchange", icon: Banknote },
                                            { name: "Bill Payments", icon: Clock }, // Approx icon
                                            { name: "24/7 Support", icon: Phone }
                                        ].map((service) => (
                                            <div key={service.name} className="flex items-center gap-4 p-5 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                                                <service.icon className="h-5 w-5 text-primary" />
                                                <span className="font-medium text-sm">{service.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Location/Map Placeholder */}
                            <div className="bg-card border rounded-3xl p-8 shadow-sm h-64 flex items-center justify-center bg-muted/20 relative overflow-hidden group">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px]" />
                                <div className="text-center z-10">
                                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
                                    <h3 className="text-lg font-semibold">Map View</h3>
                                    <p className="text-muted-foreground text-sm">123 Market St, New York, NY 10001</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Stats */}
                        <div className="space-y-6">
                            <div className="bg-card border rounded-3xl p-6 shadow-sm sticky top-24">
                                <h3 className="font-bold text-lg mb-6">Agent Details</h3>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                                <div className="h-3 w-3 rounded-full bg-current animate-pulse" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Current Status</p>
                                                <p className="text-xs text-muted-foreground">Updated 5 min ago</p>
                                            </div>
                                        </div>
                                        <Badge variant={agent.status === "Open" ? "default" : "destructive"} className="px-3">
                                            {agent.status}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Banknote className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Commission Rate</p>
                                                <p className="text-xs text-muted-foreground">Per transaction</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-lg">1.5%</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                <Clock className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Avg. Wait Time</p>
                                                <p className="text-xs text-muted-foreground">Live estimate</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-lg">&lt; 5 min</span>
                                    </div>

                                    <div className="pt-6 border-t space-y-3">
                                        <Button variant="outline" className="w-full justify-start gap-3 h-12">
                                            <Globe className="h-4 w-4" /> Visit Website
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start gap-3 h-12">
                                            <Mail className="h-4 w-4" /> Email Support
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MotionWrapper>
            </div>
        </div>
    );
}
