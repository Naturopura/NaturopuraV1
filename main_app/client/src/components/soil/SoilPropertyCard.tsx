import React from "react";
import { motion } from "framer-motion";

interface SoilPropertyCardProps {
  name: string;
  value: string;
  unit?: string;
  icon?: React.ReactNode;
}

const SoilPropertyCard: React.FC<SoilPropertyCardProps> = ({
  name,
  value,
  unit,
  icon,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-naturopura-gradient text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
    <p className="text-3xl font-bold">
      {value} {unit}
    </p>
  </motion.div>
);

export default SoilPropertyCard;