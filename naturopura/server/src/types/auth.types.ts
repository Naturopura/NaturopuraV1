export type UserRole = 'admin' | 'farmer' | 'delivery_partner' | 'store_manager';

export interface JwtPayloadUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole; // <-- This now includes "store_manager"
    aadhaarNumber?: string;
    storeManagerApprovalStatus?: 'pending' | 'approved' | 'rejected';
    deliveryPartnerApprovalStatus?: 'pending' | 'approved' | 'rejected';
    // ...other properties...
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayloadUser;
        }
    }
}