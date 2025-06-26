import React, { useState, useEffect } from 'react';
import { useToast } from '../ui/use-toast';
import { createApiClient } from '../../config/api';
import { Address } from '../../types/address';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { MapPin, Building, Loader2, Phone, User, Edit, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import FarmerLayout from '../layouts/FarmerLayout';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

interface AddressFormProps {
  onSubmit: (address: Address) => void;
  onCancel: () => void;
  purchaseId?: string;
  selectedAddressId?: string;
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
  purchaseId,
  selectedAddressId
}) => {
  const { toast } = useToast();
  const { token } = useAuth();
  const apiClient = createApiClient(token ?? undefined);
  const { isConnected } = useAccount();

  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<{ data: Address[] }>(
          '/users/addresses'
        );
        const addressesData = response.data?.data || [];
        const normalizedAddresses = addressesData.map(addr => ({
          ...addr,
          _id: typeof addr._id === 'object' && addr._id !== null ? String(addr._id) : addr._id
        }));
        setAddresses(normalizedAddresses);

        if (selectedAddressId) {
          const selectedAddr = normalizedAddresses.find(addr => addr._id === selectedAddressId);
          if (selectedAddr) {
            setSelectedAddress(selectedAddr);
            setAddress(selectedAddr);
          }
        } else if (normalizedAddresses.length > 0) {
          const defaultAddr = normalizedAddresses.find(addr => addr.isDefault);
          if (defaultAddr) {
            setSelectedAddress(defaultAddr);
            setAddress(defaultAddr);
          } else {
            setSelectedAddress(null);
            setAddress(EMPTY_ADDRESS);
          }
        } else {
          setSelectedAddress(null);
          setAddress(EMPTY_ADDRESS);
          setShowAddressForm(true); // Show form if no addresses
        }
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        toast({
          title: 'Error',
          description: err.response?.data?.message || 'Failed to load existing address.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [toast, selectedAddressId]);

  useEffect(() => {
    if (purchaseId) {
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
            description: err.response?.data?.message || 'Failed to load address.',
            variant: 'destructive'
          });
        })
        .finally(() => setLoading(false));
    }
  }, [purchaseId, toast, apiClient]);

  const handleChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({
      ...(prev || EMPTY_ADDRESS),
      [field]: field === 'isDefault' ? e.target.checked : e.target.value
    }));
  };

  const handleAddressSelect = (addr: Address) => {
    setSelectedAddress(addr);
    setAddress(addr);
    onSubmit(addr);
    // Do NOT hide the form here!
  };

  const handleEditAddress = (addr: Address) => {
    setAddress(addr); // Populate form with selected address
    setEditingAddressId(addr._id); // Mark as editing
    setShowAddressForm(true); // Show the form for editing
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      setLoading(true);
      await apiClient.delete(`/users/addresses/${id}`);
      const updated = addresses.filter(addr => addr._id !== id);
      setAddresses(updated);

      // If the deleted address was selected or being edited, reset form
      if (selectedAddress?._id === id || editingAddressId === id) {
        setSelectedAddress(null);
        setEditingAddressId(null);
        setAddress(EMPTY_ADDRESS);
        setShowAddressForm(updated.length === 0); // Show form if no addresses left
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
    if (!address) return;

    try {
      setLoading(true);
      const {
        name, phone, street, city, state, pincode, country, isDefault
      } = address;
      const payload = { name, phone, street, city, state, pincode, country, isDefault };

      const response = await apiClient.post('/users/addresses', {
        address: payload,
        isDefault: isDefault || false
      });

      // Try to get newAddress or addresses from response
      const { newAddress, addresses: updatedAddresses } = response.data?.data || {};

      let safeNewAddress = newAddress;
      if (!safeNewAddress && Array.isArray(updatedAddresses) && updatedAddresses.length > 0) {
        safeNewAddress = updatedAddresses[updatedAddresses.length - 1];
      }

      // If still not found, refetch addresses
      if (!safeNewAddress) {
        const refetch = await apiClient.get<{ data: Address[] }>('/users/addresses');
        const addressesData = refetch.data?.data || [];
        setAddresses(addressesData);
        safeNewAddress = addressesData[addressesData.length - 1];
        if (!safeNewAddress) {
          toast({
            title: 'Error',
            description: 'Address could not be saved. Please try again.',
            variant: 'destructive'
          });
          setLoading(false);
          return;
        }
      } else {
        setAddresses(Array.isArray(updatedAddresses) ? updatedAddresses : [safeNewAddress]);
      }

      setSelectedAddress(safeNewAddress);
      setAddress(safeNewAddress);
      setEditingAddressId(null);
      setShowAddressForm(false); // Hide form after successful add/edit
      onSubmit(safeNewAddress);
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

  return (
    <FarmerLayout title="Shipping Address" subtitle="Select or add a shipping address">
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Shipping Address
                </h2>
                <p className="text-gray-600 mt-2">Manage your delivery addresses</p>
              </div>
              <div className="flex items-center space-x-4">
                <ConnectButton />
              </div>
            </div>
          </div>

          {/* Saved Addresses Section */}
          {addresses && addresses.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Saved Addresses
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!isConnected}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    setEditingAddressId(null);
                    setAddress(EMPTY_ADDRESS);
                    setShowAddressForm(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
                  Add New Address
                </Button>
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
                    <CardContent className="relative p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-green-600" />
                            <h4 className="font-semibold text-gray-800 text-lg">{addr.name}</h4>
                            {addr.isDefault && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm">
                                Default
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-2 text-gray-600">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm leading-relaxed">
                                  {addr.street}
                                </p>
                                <p className="text-sm">
                                  {addr.city}, {addr.state} - {addr.pincode}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{addr.phone}</span>
                            </div>
                          </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!isConnected}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleAddressSelect(addr)}
                  >
                    Select
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!isConnected}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleEditAddress(addr)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!isConnected}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleDeleteAddress(addr._id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleDeleteAddress(addr._id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Address Form */}
          {(showAddressForm || addresses.length === 0) && (
            <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                        disabled={!isConnected}
                        className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed"
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
                        disabled={!isConnected}
                        className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed"
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
                      disabled={!isConnected}
                      className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed"
                      placeholder="Enter your complete street address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">City *</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleChange('city')}
                        required
                        disabled={!isConnected}
                        className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed"
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
                        disabled={!isConnected}
                        className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Pincode *</Label>
                      <Input
                        id="pincode"
                        placeholder="Pincode"
                        value={address.pincode}
                        onChange={handleChange('pincode')}
                        required
                        disabled={!isConnected}
                        className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed"
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
                      disabled={!isConnected}
                      className="border-gray-200 focus:border-green-400 focus:ring-green-400/20 transition-all duration-200 h-11 disabled:cursor-not-allowed"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={address.isDefault}
                      onChange={handleChange('isDefault')}
                      disabled={!isConnected}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded disabled:cursor-not-allowed"
                    />
                    <Label htmlFor="isDefault" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Set as default address
                    </Label>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddressForm(false)}
                      className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      disabled={!isConnected}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={loading || !isConnected}
                      className="px-8 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
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
