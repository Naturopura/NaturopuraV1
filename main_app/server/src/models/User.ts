import mongoose, { Schema, Document } from 'mongoose';

interface Address {
  _id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'farmer' | 'delivery_partner' | 'store_manager' | 'vendor'; // added vendor role
  deliveryPartnerApprovalStatus?: 'pending' | 'approved' | 'rejected';
  storeManagerApprovalStatus?: 'pending' | 'approved' | 'rejected';
  vendorApprovalStatus?: 'pending' | 'approved' | 'rejected';
  aadhaarNumber: string;
  phoneNumber?: string;
  addresses: Address[];
  farmSize?: number;
  cropTypes?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  isDefaultAdmin?: boolean;
  createdAt?: Date;
  kyc: {
    status: 'pending' | 'verified' | 'rejected';
    phoneVerified: boolean;
    aadhaarDetails?: {
      number: string;
      otpSent: boolean;
      otpVerified: boolean;
      transactionId: string;
      verifiedAt: Date;
    };
    documents: {
      aadhar?: string;
      pan?: string;
      selfie?: string;
    };
    verifiedAt?: Date;
    remarks?: string;
  };
  isPhoneVerified: boolean;
  phoneVerificationToken: string;
  phoneVerifiedAt?: Date | null;
  address?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const userSchema = new Schema<IUser>({
  addresses: [{
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: Number,
    isDefault: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'farmer', 'delivery_partner', 'store_manager', 'vendor'], // added vendor
    required: true 
  },
  storeManagerApprovalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  deliveryPartnerApprovalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  vendorApprovalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  aadhaarNumber: {
    type: String,
    unique: true,
    match: [/^\d{12}$/, 'Aadhaar must be a 12-digit number']
  },
  phoneNumber: String,
  farmSize: Number,
  cropTypes: [String],
  location: {
    latitude: Number,
    longitude: Number
  },
  isDefaultAdmin: { type: Boolean, default: false },
  kyc: {
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    phoneVerified: {
      type: Boolean,
      default: false
    },
    documents: {
      aadhar: String,
      pan: String,
      selfie: String
    },
    verifiedAt: Date,
    remarks: String
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
    required: true
  },
  phoneVerificationToken: {
    type: String,
    index: true
  },
  phoneVerifiedAt: {
    type: Date,
    default: null
  },
  address: { type: String },
  resetPasswordToken: {
    type: String,
    index: true,
  },
  resetPasswordExpires: {
    type: Date,
  },
},

 { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
