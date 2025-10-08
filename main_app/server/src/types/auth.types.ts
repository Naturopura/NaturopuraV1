export type UserRole =
  | "admin"
  | "farmer"
  | "delivery_partner"
  | "store_manager"
  | "vendor";

export interface JwtPayloadUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole; // <-- This now includes "store_manager"
  aadhaarNumber?: string;
  storeManagerApprovalStatus?: "pending" | "approved" | "rejected";
  deliveryPartnerApprovalStatus?: "pending" | "approved" | "rejected";
  vendorApprovalStatus?: "pending" | "approved" | "rejected";
  kyc?: {
    status: "pending" | "verified" | "rejected";
  };
  // ...other properties...
}
