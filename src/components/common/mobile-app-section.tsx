import { Button } from "@/components/ui/button";

export function MobileAppSection() {
    return (
        <section className="py-24 bg-background text-foreground overflow-hidden relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold tracking-tight mb-6 sm:text-5xl">
                            Experience Freedom <br /> on the Go
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                            Download the Cashyo mobile app to manage your finances anytime, anywhere.
                            Get real-time notifications, track expenses, and send money with a tap.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button disabled size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 rounded-xl flex items-center gap-3 cursor-not-allowed opacity-80 shadow-xl">
                                <div className="flex flex-col items-center leading-none">
                                    <span className="text-lg font-bold">Coming Soon</span>
                                    <span className="text-xs font-medium opacity-80">on App Store & Play Store</span>
                                </div>
                            </Button>
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-foreground bg-gray-500 overflow-hidden relative">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-medium">
                                <div className="flex items-center gap-1 text-yellow-400">
                                    ★★★★★
                                </div>
                                <span>4.9/5 rating by 50k+ users</span>
                            </div>
                        </div>
                    </div>

                    {/* Simplified Phone Mockup Visual - No heavy animations/blurs */}
                    <div className="flex justify-center lg:justify-end relative">
                        <div className="relative z-10 w-[280px] h-[580px] bg-card rounded-[3rem] border-[8px] border-muted shadow-2xl overflow-hidden">
                            <div className="w-full h-full bg-background relative flex flex-col">
                                <div className="absolute top-0 w-full h-8 bg-black/20 z-20 flex justify-center">
                                    <div className="w-32 h-6 bg-black rounded-b-xl" />
                                </div>

                                <div className="p-6 pt-12 space-y-6 flex-1 bg-gradient-to-b from-background to-muted/20">
                                    <div className="flex justify-between items-center">
                                        <div className="w-10 h-10 rounded-full bg-muted" />
                                        <div className="w-6 h-6 rounded-full bg-muted" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-muted rounded" />
                                        <div className="h-10 w-48 bg-foreground/10 rounded" />
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square bg-primary/10 rounded-2xl" />)}
                                    </div>
                                    <div className="h-32 bg-secondary/30 rounded-2xl" />
                                    <div className="space-y-3">
                                        {[1, 2, 3].map(i => <div key={i} className="h-16 bg-card border border-border rounded-xl" />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
