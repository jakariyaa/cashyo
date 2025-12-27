import { apiSlice } from "../api/apiSlice";

export interface SystemStats {
    users: number;
    transactions: number;
    agents: number;
    uptime: string;
}

export interface FeaturedAgent {
    _id: string;
    name: string;
    image?: string;
    bio?: string;
    country: string;
}

export const systemApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSystemStats: builder.query<{ success: boolean; data: SystemStats }, void>({
            query: () => "/system/stats",
            keepUnusedDataFor: 300, // Client side caching involved
        }),
        getFeaturedAgents: builder.query<{ success: boolean; data: FeaturedAgent[] }, void>({
            query: () => "/system/agents",
            keepUnusedDataFor: 300,
        }),
    }),
});

export const { useGetSystemStatsQuery, useGetFeaturedAgentsQuery } = systemApi;
