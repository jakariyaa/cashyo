import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AgentCardSkeleton() {
    return (
        <Card className="h-full border-0 shadow-lg bg-card/40 backdrop-blur-sm overflow-hidden">
            <div className="relative h-48 w-full">
                <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-5 pt-12 relative">
                <div className="absolute -top-10 left-6">
                    <Skeleton className="h-20 w-20 rounded-2xl shadow-lg border-4 border-card" />
                </div>
                <div className="absolute top-4 right-5">
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <div className="mt-2 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>

                <div className="mt-6 flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
            </CardContent>
        </Card>
    );
}
