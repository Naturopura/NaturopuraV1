import { PackageCheck, Truck, Boxes, MapPin, Radar } from "lucide-react";
import React from 'react';

export type Status = 'Pending' | 'In Progress' | 'Completed';
export type StepTitle = 'collection' | 'transportation' | 'storage' | 'packaging' | 'delivery' | 'tracking';
export type StepStatus = {
  status: Status;
  timestamp: string;
};

export type LogisticsStep = {
  title: StepTitle;
  description: string;
  icon: React.ReactNode;
};

export type LogisticsStatus = {
  productId: string;
  currentStep: StepTitle;
  status: {
    collection: StepStatus;
    transportation: StepStatus;
    storage: StepStatus;
    packaging: StepStatus;
    delivery: StepStatus;
  };
};

const createIcon = (Icon: React.ComponentType<{ className: string }>, className: string) => {
  return React.createElement(Icon, { className });
};

export const logisticsSteps: LogisticsStep[] = [
  {
    title: "collection",
    description: "Gathering produce from farmers.",
    icon: createIcon(PackageCheck, "w-6 h-6 text-green-700"),
  },
  {
    title: "transportation",
    description: "Moving produce to processing facilities.",
    icon: createIcon(Truck, "w-6 h-6 text-blue-600"),
  },
  {
    title: "storage",
    description: "Storing produce in controlled environments.",
    icon: createIcon(Boxes, "w-6 h-6 text-yellow-600"),
  },
  {
    title: "packaging",
    description: "Preparing produce for distribution.",
    icon: createIcon(MapPin, "w-6 h-6 text-purple-600"),
  },
  {
    title: "delivery",
    description: "Final delivery to customers.",
    icon: createIcon(Radar, "w-6 h-6 text-orange-600"),
  },
  {
    title: "tracking",
    description: "Real-time vehicle and stock tracking.",
    icon: createIcon(Radar, "w-6 h-6 text-pink-600"),
  },
];
