import React, { useState, useEffect, useMemo } from 'react';
import { useToast } from '../ui/use-toast';
import { createApiClient } from '../../config/api';
import type { Address } from '../../types/address';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { MapPin, Loader2, Phone, User, Edit, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

interface AddressFormProps {
  onSubmit: (address: Address) => void;
  onCancel: () => void;
  purchaseId?: string;
  selectedAddressId?: string;
  selectedPaymentMethod: 'metamask' | 'razorpay';
  onPaymentMethodChange: (method: 'metamask' | 'razorpay') => void;
  onAddressSelect?: (address: Address) => void;
  token?: string;
  apiClient?: any;
}

const EMPTY_ADDRESS: Address = {
  name: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  pincode: '',
  country: '',
  isDefault: false,
  _id: '',
  createdAt: '',
  updatedAt: ''
};

const AddressForm: React.FC<AddressFormProps> = ({
  onSubmit,
  onCancel,
  purchaseId,
  selectedAddressId,
  selectedPaymentMethod,
  onPaymentMethodChange,
  onAddressSelect
}) => {
  const { toast } = useToast();
  const { token } = useAuth();
  // --- FIX APPLIED HERE ---
  // Use useMemo to memoize the apiClient instance.
  // It will only be re-created if 'token' changes.
  const apiClient = useMemo(() => createApiClient(token ?? undefined), [token]);
  // -------------------------
  const { isConnected } = useAccount();

  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const disableAddressActions = !token || (selectedPaymentMethod === 'metamask' && !isConnected);

  // Fetch addresses on component mount or when token/selectedAddressId changes
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) {
        setAddresses([]);
        setSelectedAddress(null);
        setAddress(EMPTY_ADDRESS);
        setShowAddressForm(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await apiClient.get<{ data: Address[] }>('/users/addresses');
        const addressesData = response.data?.data || [];
        const normalizedAddresses = addressesData.map(addr => ({
          ...addr,
          _id: typeof addr._id === 'object' && addr._id !== null ? String(addr._id) : addr._id
        }));
        setAddresses(normalizedAddresses);

        if (normalizedAddresses.length === 0) {
          setShowAddressForm(true);
          setAddress(EMPTY_ADDRESS);
          setSelectedAddress(null);
        } else {
          let initialSelected = null;
          if (selectedAddressId) {
            initialSelected = normalizedAddresses.find(addr => addr._id === selectedAddressId);
          }
          if (!initialSelected) {
            initialSelected = normalizedAddresses.find(addr => addr.isDefault) || normalizedAddresses[0];
          }
          setSelectedAddress(initialSelected || null);
          setAddress(initialSelected || EMPTY_ADDRESS);
          setShowAddressForm(false);
        }
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        toast({
          title: 'Error',
          description: err.response?.data?.message || 'Failed to load existing address.',
          variant: 'destructive'
        });
        if (addresses.length === 0) {
          setShowAddressForm(true);
          setAddress(EMPTY_ADDRESS);
          setSelectedAddress(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [token, selectedAddressId, apiClient, toast]); // Cleaned up dependencies

  // Fetch address for a specific purchase ID (if provided)
  useEffect(() => {
    if (purchaseId && token) {
      setLoading(true);
      apiClient.get<{ data: { data: Address } }>(`/payments/purchase/${purchaseId}`)
        .then((response) => {
          const addressData = response.data.data.data;
          if (addressData) {
            setAddress(addressData);
            setEditingAddressId(purchaseId);
            setShowAddressForm(true);
          }
        })
        .catch((error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } };
          toast({
            title: 'Error',
            description: err.response?.data?.message || 'Failed to load address for purchase.',
            variant: 'destructive'
          });
        })
        .finally(() => setLoading(false));
    }
  }, [purchaseId, token, apiClient, toast]); // Cleaned up dependencies

  const handleChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({
      ...(prev || EMPTY_ADDRESS),
      [field]: field === 'isDefault' ? e.target.checked : e.target.value
    }));
  };

  const handlePaymentMethodChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMethod = e.target.value as 'metamask' | 'razorpay';
    onPaymentMethodChange(newMethod);

    if (newMethod === 'metamask') {
      setShowAddressForm(false);
      setEditingAddressId(null);
      
      if (isConnected) {
        const selectedAddr = selectedAddress || addresses.find(addr => addr.isDefault) || addresses[0];
        if (selectedAddr) {
          setSelectedAddress(selectedAddr);
          setAddress(selectedAddr);
        }
      } else {
        setSelectedAddress(null);
        setAddress(EMPTY_ADDRESS);
      }
    } else if (newMethod === 'razorpay') {
      setShowAddressForm(true);
      setEditingAddressId(null);
      
      const selectedAddr = selectedAddress || addresses.find(addr => addr.isDefault) || addresses[0];
      if (selectedAddr) {
        setSelectedAddress(selectedAddr);
        setAddress(selectedAddr);
      } else {
        setAddress(EMPTY_ADDRESS);
      }
    }
  };

  const handleAddressSelect = (addr: Address) => {
    if (selectedPaymentMethod === 'metamask' && !isConnected) {
      toast({
        title: 'Wallet Connection Required',
        description: 'Please connect your wallet to select an address for purchase.',
        variant: 'destructive'
      });
      return;
    }
    setSelectedAddress(addr);
    setAddress(addr);
    if (selectedPaymentMethod === 'razorpay' && onAddressSelect) {
      onAddressSelect(addr);
    } else {
      onSubmit(addr);
    }
    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  const handleAddNewAddress = () => {
    if (selectedPaymentMethod === 'metamask' && !isConnected) {
      toast({
        title: 'Wallet Connection Required',
        description: 'Please connect your wallet to add a new address.',
        variant: 'destructive'
      });
      return;
    }
    setAddress(EMPTY_ADDRESS);
    setEditingAddressId(null);
    setShowAddressForm(true);
  };

  const handleEditAddress = (addr: Address) => {
    setAddress(addr);
    setEditingAddressId(addr._id);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id: string) => {
    if (!token) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to delete addresses.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading(true);
      await apiClient.delete(`/users/addresses/${id}`);
      const updated = addresses.filter(addr => String(addr._id) !== String(id));
      setAddresses(updated);

      if (selectedAddress?._id === id || editingAddressId === id) {
        setSelectedAddress(null);
        setEditingAddressId(null);
        setAddress(EMPTY_ADDRESS);
      }

      if (updated.length === 0) {
        setShowAddressForm(true);
      } else if (selectedAddress?._id === id && updated.length > 0) {
        const newSelected = updated.find(a => a.isDefault) || updated[0];
        setSelectedAddress(newSelected || null);
        setAddress(newSelected || EMPTY_ADDRESS);
        if (newSelected) {
          if (selectedPaymentMethod === 'razorpay' && onAddressSelect) {
            onAddressSelect(newSelected);
          } else {
            onSubmit(newSelected);
          }
        }
      }

      toast({ title: 'Deleted', description: 'Address deleted.', variant: 'default' });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete address.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast({
        title: 'Validation Error',
        description: 'Please log in to manage addresses.',
        variant: 'destructive'
      });
      return;
    }

    const { name, phone, street, city, state, pincode, country, isDefault } = address;
    if (!name || !phone || !street || !city || !state || !pincode || !country) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required address fields.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading(true);
      const payload = { name, phone, street, city, state, pincode, country, isDefault };

      let response;
      if (editingAddressId) {
        console.log('Updating address with ID:', editingAddressId);
        response = await apiClient.put(`/users/addresses/${editingAddressId}`, {
          address: payload,
          isDefault: isDefault || false
        });
      } else {
        response = await apiClient.post('/users/addresses', {
          address: payload,
          isDefault: isDefault || false
        });
      }

      const refetchResponse = await apiClient.get<{ data: Address[] }>('/users/addresses');
      const updatedAddresses = refetchResponse.data?.data || [];
      setAddresses(updatedAddresses);

      const savedAddress = updatedAddresses.find(addr => String(addr._id) === String(editingAddressId || response?.data?.data?.newAddress?._id)) ||
        updatedAddresses.find(addr => addr.isDefault) ||
        updatedAddresses[updatedAddresses.length - 1];

      setSelectedAddress(savedAddress || null);
      setAddress(savedAddress || EMPTY_ADDRESS);
      setEditingAddressId(null);
      setShowAddressForm(false);

      if (selectedPaymentMethod === 'metamask') {
        if (savedAddress && isConnected) {
          onSubmit(savedAddress);
        } else {
          toast({
            title: 'Wallet Required',
            description: 'Please connect your wallet to proceed with Metamask payment.',
            variant: 'destructive'
          });
        }
      } else {
        onSubmit(savedAddress || address);
      }

      toast({ title: 'Success', description: 'Address saved.', variant: 'default' });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to save address.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const shouldShowAddNewButton = addresses.length > 0 && !showAddressForm;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Shipping Address
              </h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage your delivery addresses</p>
            </div>
            <div className="flex justify-center sm:justify-end space-x-4 items-center">
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="metamask"
                    checked={selectedPaymentMethod === 'metamask'}
                    onChange={handlePaymentMethodChangeInternal}
                    className="form-radio text-green-600"
                  />
                  <span className="ml-2 text-gray-700">Metamask</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={selectedPaymentMethod === 'razorpay'}
                    onChange={handlePaymentMethodChangeInternal}
                    className="form-radio text-green-600"
                  />
                  <span className="ml-2 text-gray-700">Razorpay</span>
                </label>
              </div>
              {selectedPaymentMethod === 'metamask' && (
                <ConnectButton />
              )}
            </div>
          </div>
        </div>

        {addresses.length > 0 && !(showAddressForm && selectedPaymentMethod === 'razorpay' && !editingAddressId) && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 px-2 sm:px-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2 justify-center sm:justify-start">
                <MapPin className="h-5 w-5 text-green-600" />
                Saved Addresses
              </h3>
              {shouldShowAddNewButton && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={disableAddressActions}
                  className="bg-gradient-to-r from-[#8DA63F] via-[#707e22] to-[#666e21] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-white"
                  onClick={handleAddNewAddress}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {addresses.map((addr) => (
                <Card
                  key={addr._id}
                  className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-0 ${
                    selectedAddress?._id === addr._id
                      ? 'bg-gradient-to-r from-green-50 to-blue-50 shadow-lg ring-2 ring-green-400'
                      : 'bg-white/60 backdrop-blur-sm hover:bg-white/80'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="relative p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-green-600" />
                            <h4 className="font-semibold text-gray-800 text-base sm:text-lg">{addr.name}</h4>
                          </div>
                          {addr.isDefault && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm w-fit">
                              Default
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 text-gray-600">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm leading-relaxed">{addr.street}</p>
                              <p className="text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{addr.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row lg:flex-col gap-2 lg:ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={selectedPaymentMethod === 'metamask' && !isConnected}
                          className="bg-gradient-to-r from-[#8DA63F] via-[#707e22] to-[#666e21] shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-1 lg:flex-none text-white"
                          onClick={() => handleAddressSelect(addr)}
                        >
                          Select
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={disableAddressActions}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-1 lg:flex-none"
                          onClick={() => handleEditAddress(addr)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={disableAddressActions}
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-1 lg:flex-none"
                          onClick={() => handleDeleteAddress(addr._id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {(showAddressForm || (addresses.length === 0 && token) || (selectedPaymentMethod === 'razorpay' && addresses.length === 0)) && (
          <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
                {editingAddressId ? 'Edit Address' : 'Add New Address'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <User className="h-4 w-4 text-green-600" />
                      <span>Full Name *</span>
                    </Label>
                    <Input
                      id="name"
                      value={address.name}
                      onChange={handleChange('name')}
                      required
                      disabled={disableAddressActions}
                      className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed text-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span>Phone Number *</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={address.phone}
                      onChange={handleChange('phone')}
                      required
                      disabled={disableAddressActions}
                      className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>Street Address *</span>
                  </Label>
                  <Input
                    id="street"
                    value={address.street}
                    onChange={handleChange('street')}
                    required
                    disabled={disableAddressActions}
                    className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed text-base"
                    placeholder="Enter your complete street address"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">City *</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={address.city}
                      onChange={handleChange('city')}
                      required
                      disabled={disableAddressActions}
                      className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">State *</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      value={address.state}
                      onChange={handleChange('state')}
                      required
                      disabled={disableAddressActions}
                      className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed text-base"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                    <Label className="text-sm font-medium text-gray-700">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="Pincode"
                      value={address.pincode}
                      onChange={handleChange('pincode')}
                      required
                      disabled={disableAddressActions}
                      className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Country *</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    value={address.country}
                    onChange={handleChange('country')}
                    required
                    disabled={disableAddressActions}
                    className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed text-base"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={address.isDefault}
                    onChange={handleChange('isDefault')}
                    disabled={disableAddressActions}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded disabled:cursor-not-allowed"
                  />
                  <Label htmlFor="isDefault" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Set as default address
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 border-t border-gray-100">
                  {addresses.length > 0 && showAddressForm && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddressId(null);
                        onCancel();
                      }}
                      className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 h-11 order-2 sm:order-1"
                      disabled={disableAddressActions}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={loading || disableAddressActions}
                    className="px-8 py-2 bg-gradient-to-r from-[#8DA63F] via-[#707e22] to-[#666e21] text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed h-11 order-1 sm:order-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      editingAddressId ? 'Update Address' : 'Add Address'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AddressForm;