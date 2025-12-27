import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { useGetFeaturedAgentsQuery } from "@/redux/features/system/systemApi";

export function AgentsPremium() {
    const { data: agentsData } = useGetFeaturedAgentsQuery();
    const agents = agentsData?.data || [];

    // Transform DB agents to Testimonials format
    const testimonials = agents.map(agent => ({
        quote: agent.bio || "Helping users worldwide with fast and secure transactions.",
        name: agent.name,
        title: `Certified Agent - ${agent.country || "Global"}`,
    }));

    // Fallback if no agents yet
    const displayItems = testimonials.length > 0 ? testimonials : fallbackTestimonials;

    return (
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-background dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <h2 className="text-3xl font-bold text-center mb-8 z-10 text-foreground">
                Trusted by Agents Worldwide
            </h2>
            <div className="absolute inset-0 bg-grid-black/[0.1] dark:bg-grid-white/[0.1] -z-10 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]" />
            <InfiniteMovingCards
                items={displayItems}
                direction="right"
                speed="slow"
            />
        </div>
    );
}

const fallbackTestimonials = [
    {
        quote: "Cashyo has completely transformed how I handle transactions for my local community. It's fast, reliable, and the commission structure is fantastic.",
        name: "Sarah Chen",
        title: "Top Agent - Singapore",
    },
    {
        quote: "The best platform for digital agents. The interface is intuitive, and the support team is always there when you need them. Highly recommended!",
        name: "Michael Rodriguez",
        title: "Senior Agent - Madrid",
    },
    {
        quote: "I've been using Cashyo for over a year now, and my earnings have doubled. The network reliability is unmatched in the industry.",
        name: "Amina Okafor",
        title: "Regional Agent - Lagos",
    },
    {
        quote: "Security was my main concern, but Cashyo's robust verification and encryption gave me peace of mind. My customers love it too.",
        name: "David Kim",
        title: "Agent - Seoul",
    },
    {
        quote: "The mobile app for agents is a game-changer. I can manage my entire business from my phone, anytime, anywhere.",
        name: "Emma Wilson",
        title: "Mobile Agent - London",
    }
];
