import type{ Address } from '../types/address';

export interface NewAddress {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault?: boolean;
}

export interface AddressesResponse {
  data: {
    data: {
      data: Address[];
    };
  };
}

export interface AddressResponse {
  data: {
    data: {
      data: Address;
    };
  };
}

export interface AddressFormProps {
  onSubmit: (address: Address) => void;
  onCancel: () => void;
  purchaseId?: string;
  selectedAddressId?: string;
}
