export interface Address {
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
  shippingAddress: string;
}

export type NewAddress = Omit<Address, '_id' | 'createdAt' | 'updatedAt'>;
