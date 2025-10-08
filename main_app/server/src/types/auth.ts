// Define user roles as a union type
export type UserRole = 'admin' | 'farmer' | 'delivery_partner' | 'store_manager';

export interface JwtPayloadUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  aadhaarNumber?: string;
  storeManagerApprovalStatus?: 'pending' | 'approved' | 'rejected';
  deliveryPartnerApprovalStatus?: 'pending' | 'approved' | 'rejected';
  // ...other properties...
}
