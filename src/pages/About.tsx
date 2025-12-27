import { MotionWrapper } from "@/components/common/motion-wrapper";
import { AboutHero } from "@/components/common/about-hero";
import { Mission } from "@/components/common/mission";
import { Team } from "@/components/common/team";
// Using the dynamic stats as well or instead?
// Let's keep the company facts separate but styled better.

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <MotionWrapper>
        <AboutHero />
      </MotionWrapper>

      {/* Company Facts / Stats */}
      <section className="py-16 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <MotionWrapper delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Founded", value: "2023" },
                { label: "Global Users", value: "10M+" },
                { label: "Countries Supported", value: "100+" },
                { label: "Team Members", value: "250+" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Mission & Values */}
      <MotionWrapper delay={0.3}>
        <Mission />
      </MotionWrapper>

      {/* Team Section */}
      <MotionWrapper delay={0.4}>
        <Team />
      </MotionWrapper>

      {/* CTA / Final Impact */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
            Ready to shape the future of finance?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join thousands of others who are already part of the Cashyo revolution.
          </p>
          {/* Reuse the CTA component or a button if preferred, but existing page didn't have one explicitly besides header */}
        </div>
      </section>
    </div>
  );
}
