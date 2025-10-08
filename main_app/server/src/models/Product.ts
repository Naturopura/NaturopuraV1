import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  category: 'cereals_grains' | 'pulses_legumes' | 'oilseeds' | 'fiber_crops' | 'sugar_crops' | 'vegetables' | 'fruits' | 'beverage_crops' | 'cultivated_fungi' | 'aquaculture' | 'farmed_animals' | 'other';
  price: number;
  quantity: number;
  unit: string;
  farmerId: mongoose.Types.ObjectId;
  images: string[];
  status: 'available' | 'out_of_stock' | 'purchased';
  arrival_status: 'pending' | 'arrived';
  arrivalDate: Date | null;
  shipping_status: 'pending' | 'shipped' | 'delivered';
  shippedDate: Date | null;
  deliveredDate: Date | null;
  vehicle_number: string;
  origin: string;
  destination: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'cereals_grains',
      'pulses_legumes', 
      'oilseeds',
      'fiber_crops',
      'sugar_crops',
      'vegetables',
      'fruits',
      'beverage_crops',
      'cultivated_fungi',
      'aquaculture',
      'farmed_animals',
      'animal_husbandry',
      'other'
    ]
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  farmerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  images: [{ type: String }], // Array of image paths
  status: { 
    type: String, 
    enum: ['available', 'out_of_stock','purchased'], 
    default: 'available' 
  },
  arrival_status: {
    type: String,
    enum: ['pending', 'arrived'],
    default: 'pending'
  },
  arrivalDate: {
    type: Date,
    default: null
  },
  shipping_status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
  },
  shippedDate: {
    type: Date,
    default: null
  },
  deliveredDate: {
    type: Date,
    default: null
  },
  vehicle_number: { type: String, default: "" },
  origin: { type: String, default: "" },
  destination: { type: String, default: "" }
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', productSchema);
