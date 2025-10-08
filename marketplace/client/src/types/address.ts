export interface Address {
  _id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  shippingAddress?: boolean;
}

