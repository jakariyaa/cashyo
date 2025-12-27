
import { DashboardNav } from "@/components/layout/Dashboard-Nav";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            <DashboardNav />
            <div className="container mx-auto p-6 max-w-7xl">
                {/* Header Skeleton */}
                <div className="mb-8 space-y-2">
                    <Skeleton className="h-10 w-[250px]" />
                    <Skeleton className="h-4 w-[350px]" />
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-[120px] mb-1" />
                                <Skeleton className="h-3 w-[80px]" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Tabs & Table Skeleton */}
                <div className="space-y-6">
                    <Skeleton className="h-10 w-[300px]" />
                    <Card>
                        <CardHeader className="space-y-2">
                            <Skeleton className="h-6 w-[150px]" />
                            <Skeleton className="h-4 w-[250px]" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Table Header */}
                                <div className="flex justify-between mb-4">
                                    <Skeleton className="h-8 w-[100px]" />
                                    <Skeleton className="h-8 w-[100px]" />
                                </div>
                                {/* Table Rows */}
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
