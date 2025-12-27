import { motion } from "framer-motion";
import { Users, Globe, Activity, ShieldCheck } from "lucide-react";
import { useGetSystemStatsQuery } from "@/redux/features/system/systemApi";

export function Stats() {
  const { data: statsData } = useGetSystemStatsQuery();
  const stats = statsData?.data;

  const statItems = [
    {
      id: 1,
      name: "Active Users",
      value: stats?.users ? `${(stats.users / 1000).toFixed(1)}K+` : "10M+", // Fallback or formatted
      description: "Trust us with their daily finance",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: 2,
      name: "Agent Points",
      value: stats?.agents ? `${stats.agents}+` : "50K+",
      description: "Locations worldwide",
      icon: Globe,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      id: 3,
      name: "Transactions",
      value: stats?.transactions ? `${(stats.transactions / 1000).toFixed(1)}K+` : "5B+",
      description: "Securely processed annually",
      icon: Activity,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      id: 4,
      name: "Uptime",
      value: stats?.uptime || "99.9%",
      description: "Reliability you can count on",
      icon: ShieldCheck,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <section className="bg-background py-16 sm:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <dd className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</dd>
                  <dt className="text-base font-semibold text-foreground/80 mt-1">{stat.name}</dt>
                  <p className="text-sm text-muted-foreground mt-2">{stat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
