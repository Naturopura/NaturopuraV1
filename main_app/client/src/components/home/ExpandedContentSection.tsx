import { motion } from "framer-motion";
import VisionMissionSection from "./VisionMissionSection";
import CoreFeaturesSection from "./CoreFeaturesSection";
import AIoTUseCasesSection from "./AIoTUseCasesSection";
import ModulesWorkflowsSection from "./ModulesWorkflowsSection";
import ImpactSection from "./ImpactSection";
import FutureScopeSection from "./FutureScopeSection";

const ExpandedContentSection = () => (
  <motion.section
    className="w-full bg-white/60 backdrop-blur-md py-24 px-4 relative z-10"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.1 }}
  >
    <div className="max-w-5xl mx-auto space-y-16">
      <VisionMissionSection />
      <CoreFeaturesSection />
      <AIoTUseCasesSection />
      <ModulesWorkflowsSection />
      <ImpactSection />
      <FutureScopeSection />
    </div>
  </motion.section>
);

export default ExpandedContentSection;