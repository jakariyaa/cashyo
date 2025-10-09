
import { CTASection } from "@/components/common/cta-section";
import { Features } from "@/components/common/features-preview";
import { Hero } from "@/components/common/hero";
import { Stats } from "@/components/common/stats";
import { Testimonials } from "@/components/common/testimonials";
import Tour from "@/components/common/tour";
import "@/components/common/tour.css";

const Homepage = () => {
  return (
    <main>
      <Tour />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <CTASection />
    </main>
  );
};

export default Homepage;

