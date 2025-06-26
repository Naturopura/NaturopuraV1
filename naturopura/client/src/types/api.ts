
// Remove the custom UploadProgressEvent interface and use AxiosProgressEvent instead
export interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
      code?: number;
      success?: boolean;
      verificationToken?: string;
    };
    status?: number;
  };
}

export interface VerificationResponse {
  success: boolean;
  isVerified: boolean;
  verificationToken?: string;
  message?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  farmerId: string;
  images: string[];
  status: 'available' | 'out_of_stock' | 'purchased';
  createdAt?: string;
  updatedAt?: string;
}