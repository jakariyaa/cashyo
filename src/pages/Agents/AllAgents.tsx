import { useState, useEffect, useRef, useCallback } from "react";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { AgentCard } from "@/components/common/AgentCard";
import { AgentCardSkeleton } from "@/components/common/AgentCardSkeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useGetAgentsQuery } from "@/redux/features/dashboard/userApi";

export default function AllAgents() {
    const [page, setPage] = useState(1);
    const [allAgents, setAllAgents] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const { data: agentsData, isLoading, isFetching, isError } = useGetAgentsQuery({ page, limit: 12 }, {
        refetchOnMountOrArgChange: true
    });

    // Debug logging
    useEffect(() => {
        if (agentsData?.data?.agents) {

            setAllAgents(prev => {
                if (page === 1) return agentsData.data.agents;

                const newAgents = agentsData.data.agents.filter((a: any) =>
                    !prev.some(p => p._id === a._id)
                );
                return [...prev, ...newAgents];
            });

            if (agentsData.data.pagination) {
                setHasMore(agentsData.data.pagination.hasMore);
            }
        }
    }, [agentsData, page]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterType, setFilterType] = useState("All");
    const [showFilters, setShowFilters] = useState(false);

    // Observer for infinite scroll
    const observer = useRef<IntersectionObserver | null>(null);
    const lastAgentRef = useCallback((node: HTMLDivElement) => {
        if (isLoading || isFetching) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, isFetching, hasMore]);


    const filteredAgents = allAgents.filter((agent: any) => {
        const nameMatch = agent.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const locationMatch = agent.location?.toLowerCase().includes(searchTerm.toLowerCase()) || agent.country?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSearch = nameMatch || locationMatch;

        const matchesStatus = filterStatus === "All" || agent.agentStatus === filterStatus;
        const matchesType = filterType === "All" || agent.agentType === filterType;

        return matchesSearch && matchesStatus && matchesType;
    });

    const clearFilters = () => {
        setSearchTerm("");
        setFilterStatus("All");
        setFilterType("All");
    };

    const activeFiltersCount = (filterStatus !== "All" ? 1 : 0) + (filterType !== "All" ? 1 : 0) + (searchTerm ? 1 : 0);

    if (isError) {
        return (
            <div className="min-h-screen bg-muted/30 py-12 flex flex-col justify-center items-center">
                <div className="text-center space-y-4">
                    <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        <X className="h-8 w-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Failed to load agents</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        We couldn't fetch the agent list. Please check your connection and try again.
                    </p>
                    <Button onClick={() => window.location.reload()} variant="default">
                        Retry Connection
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30 py-12 pb-32">
            <div className="container mx-auto px-6 max-w-7xl">
                <MotionWrapper>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">Find an Agent</h1>
                            <p className="text-muted-foreground">Locate nearest cash-in/cash-out points and branches.</p>
                        </div>
                        <div className="flex flex-col gap-4 w-full md:w-auto items-end">
                            <div className="flex gap-2 w-full md:w-auto">
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by name or city..."
                                        className="pl-9 bg-background"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Button
                                    variant={showFilters ? "secondary" : "outline"}
                                    className="gap-2"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <Filter className="h-4 w-4" />
                                    Filters
                                    {activeFiltersCount > 0 && (
                                        <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                                            {activeFiltersCount}
                                        </Badge>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Expandable Filters Area */}
                    {showFilters && (
                        <MotionWrapper delay={0.1}>
                            <div className="bg-background p-4 rounded-xl border border-border shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">Status</Label>
                                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Statuses</SelectItem>
                                            <SelectItem value="Open">Open Now</SelectItem>
                                            <SelectItem value="Closed">Closed</SelectItem>
                                            <SelectItem value="Closing Soon">Closing Soon</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">Type</Label>
                                    <Select value={filterType} onValueChange={setFilterType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Types</SelectItem>
                                            <SelectItem value="Branch">Branch</SelectItem>
                                            <SelectItem value="ATM">ATM</SelectItem>
                                            <SelectItem value="Kiosk">Kiosk</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end">
                                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground w-full justify-start md:justify-center" onClick={clearFilters}>
                                        <X className="h-4 w-4 mr-2" />
                                        Clear All Filters
                                    </Button>
                                </div>
                            </div>
                        </MotionWrapper>
                    )}

                    {/* Content Listing Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Only show full skeletons on INITIAL load if no data exists */}
                        {isLoading && allAgents.length === 0 ? (
                            Array.from({ length: 9 }).map((_, i) => (
                                <AgentCardSkeleton key={i} />
                            ))
                        ) : (
                            <>
                                {filteredAgents.map((agent: any, index: number) => {
                                    const isLast = filteredAgents.length === index + 1;
                                    return (
                                        <div ref={isLast ? lastAgentRef : null} key={agent._id}>
                                            <AgentCard
                                                id={agent._id}
                                                name={agent.name}
                                                location={agent.location || agent.country}
                                                rating={agent.rating || 0}
                                                status={agent.agentStatus}
                                                type={agent.agentType}
                                                image={agent.image}
                                                delay={0}
                                            />
                                        </div>
                                    )
                                })}

                                {/* Show small spinner/skeleton at bottom when fetching MORE */}
                                {(isFetching && page > 1) && (
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <AgentCardSkeleton key={`more-${i}`} />
                                    ))
                                )}
                            </>
                        )}
                    </div>

                    {!isLoading && filteredAgents.length === 0 && (
                        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border mt-8">
                            <div className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4">
                                <Search className="h-12 w-12" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground">No agents found</h3>
                            <p className="text-muted-foreground mt-1">Try adjusting your filters or search terms.</p>
                            <Button variant="link" onClick={clearFilters} className="mt-4 text-primary">
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </MotionWrapper>
            </div>
        </div>
    );
}
