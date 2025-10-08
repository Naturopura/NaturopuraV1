import mongoose, { Document } from 'mongoose';

export type StepStatusEnum = 'Pending' | 'In Progress' | 'Completed';

export interface StepStatus {
  completed: boolean;
  status: StepStatusEnum;
  timestamp?: Date;
  location?: string;
  notes?: string;
  vehicleId?: string;
  estimatedArrival?: Date;
  warehouseId?: string;
  temperature?: number;
  humidity?: number;
  packageType?: string;
  quantity?: number;
  trackingId?: string;
  estimatedDelivery?: Date;
}

export interface LogisticsStatusType extends Document {
  productId: mongoose.Types.ObjectId;
  status: {
    collection: StepStatus;
    transportation: StepStatus;
    storage: StepStatus;
    packaging: StepStatus;
    delivery: StepStatus;
  };
  currentStep: 'collection' | 'transportation' | 'storage' | 'packaging' | 'delivery';
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const logisticsStatusSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  status: {
    collection: {
      completed: { type: Boolean, default: false },
      status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
      timestamp: Date,
      location: String,
      notes: String
    },
    transportation: {
      completed: { type: Boolean, default: false },
      status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
      timestamp: Date,
      location: String,
      vehicleId: String,
      estimatedArrival: Date
    },
    storage: {
      completed: { type: Boolean, default: false },
      status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
      timestamp: Date,
      warehouseId: String,
      temperature: Number,
      humidity: Number
    },
    packaging: {
      completed: { type: Boolean, default: false },
      status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
      timestamp: Date,
      packageType: String,
      quantity: Number
    },
    delivery: {
      completed: { type: Boolean, default: false },
      status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
      timestamp: Date,
      location: String,
      trackingId: String,
      estimatedDelivery: Date
    }
  },
  currentStep: {
    type: String,
    enum: ['collection', 'transportation', 'storage', 'packaging', 'delivery'],
    default: 'collection'
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

export default mongoose.model<LogisticsStatusType>('LogisticsStatus', logisticsStatusSchema);