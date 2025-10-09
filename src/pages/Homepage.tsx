import { CTASection } from "@/components/common/cta-section";
import { Features } from "@/components/common/features-preview";
import { Hero } from "@/components/common/hero";
import { Stats } from "@/components/common/stats";
import { Testimonials } from "@/components/common/testimonials";

const Homepage = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <CTASection />
    </main>
  );
};

export default Homepage;
