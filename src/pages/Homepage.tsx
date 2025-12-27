
import { CTASection } from "@/components/common/cta-section";
import { FeaturesBento } from "@/components/common/features-bento";
import { Hero } from "@/components/common/hero";
import { Stats } from "@/components/common/stats";
import { AgentsPremium } from "@/components/common/agents-premium";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { HowItWorks } from "@/components/common/how-it-works";
import { SecuritySection } from "@/components/common/security-section";
import { FAQSection } from "@/components/common/faq-section";
import { MobileAppSection } from "@/components/common/mobile-app-section";

const Homepage = () => {
  return (
    <main className="overflow-x-hidden">

      <MotionWrapper delay={0}>
        <Hero />
      </MotionWrapper>
      <MotionWrapper delay={0.1}>
        <Stats />
      </MotionWrapper>

      {/* New Sections Integrated */}
      <MotionWrapper delay={0.1}>
        <HowItWorks />
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <FeaturesBento />
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <MobileAppSection />
      </MotionWrapper>

      <MotionWrapper delay={0.3}>
        <SecuritySection />
      </MotionWrapper>

      <MotionWrapper delay={0.3}>
        <AgentsPremium />
      </MotionWrapper>

      <MotionWrapper delay={0.4}>
        <FAQSection />
      </MotionWrapper>

      <MotionWrapper delay={0.4}>
        <CTASection />
      </MotionWrapper>
    </main>
  );
};

export default Homepage;
