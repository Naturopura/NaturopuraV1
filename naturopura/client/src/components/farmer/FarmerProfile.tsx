import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for exit animations
import {
  User,
  Mail,
  Phone,
  MapPin,
  Key,
  Save,
  Check,
  Loader2 // Import Loader2 for spinning loader on submit
} from 'lucide-react';
import { Label } from '../ui/label';
import { createApiClient, ENDPOINTS } from '../../config/api';

// Assuming FarmerLayout now wraps its children properly
import FarmerLayout from '../layouts/FarmerLayout'; // No longer imported here, assumed to be parent

// Update the formData state type and initialization
interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const FarmerProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Convert location object to string if it exists, otherwise use empty string
  const getLocationString = (location: { latitude: number; longitude: number; } | string | undefined) => {
    if (typeof location === 'object' && location !== null) {
      return `${location.latitude}, ${location.longitude}`;
    }
    return typeof location === 'string' ? location : '';
  };

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    location: getLocationString(user?.location),
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Update handleInputChange to handle location input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token'); // Or get from context if you store it there
      const client = createApiClient(token || undefined);

      // Prepare the payload
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        location: formData.location,
        // Do NOT send password fields here unless you handle them separately
      };

      await client.put(ENDPOINTS.UPDATE_PROFILE, payload);

      // Optionally update user context/state here if needed
      // setUser(res.data.user);

      setIsSubmitting(false);
      setIsEditing(false);
      setShowSuccess(true);

      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      // Optionally show error to user
      console.error('Profile update failed:', error);
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    // The main div for FarmerProfile should NOT include FarmerSidebar or FarmerHeader.
    // It should focus on its content, which will be placed inside FarmerLayout.
    // The min-h-screen and bg-gray-50 are also handled by FarmerLayout.
    // The responsive padding is now applied in FarmerLayout's <main> tag.
    <motion.div
      className="max-w-4xl mx-auto space-y-6 sm:space-y-8" // Responsive max-width and vertical spacing
      variants={containerVariants}
      initial="hidden"
      animate="show"
      // Added key to re-animate when isEditing changes (optional, for a nice touch)
      key={isEditing ? "editing" : "viewing"}
    >
      {/* Success Message */}
      <AnimatePresence> {/* Required for exit animations */}
        {showSuccess && (
          <motion.div
            className="flex items-center gap-3 rounded-lg bg-emerald-50 p-3 sm:p-4 text-emerald-800 border border-emerald-200" // Responsive padding
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} // Exit animation
          >
            <Check className="h-5 w-5 text-emerald-500" />
            <p className="font-medium text-sm sm:text-base">Profile updated successfully!</p> {/* Responsive font size */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 border-4 border-emerald-100"> {/* Responsive avatar size */}
            <AvatarFallback className="bg-emerald-50 text-emerald-600 text-xl sm:text-2xl md:text-3xl font-semibold"> {/* Responsive fallback text size */}
              {user?.name?.charAt(0) || 'F'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">{user?.name}</h1> {/* Responsive font size */}
            <p className="text-sm sm:text-base text-emerald-600">Farmer</p> {/* Responsive font size */}
          </div>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => {
            setIsEditing(!isEditing);
            // Optionally reset form data if cancelling edit
            if (isEditing) {
              setFormData({
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phoneNumber || '',
                location: getLocationString(user?.location),
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
              });
            }
          }}
          disabled={isSubmitting}
          className="w-full sm:w-auto mt-4 sm:mt-0" // Full width on mobile, auto on sm+; responsive margin-top
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </motion.div>

      {/* Profile Information Form */}
      <motion.form variants={itemVariants} onSubmit={handleSubmit}>
        <Card className="overflow-hidden border-t-4 border-t-emerald-500">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">Profile Information</CardTitle> {/* Responsive font size */}
            <CardDescription className="text-sm sm:text-base">Update your personal information and contact details</CardDescription> {/* Responsive font size */}
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6"> {/* Responsive vertical spacing for sections */}
            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"> {/* Responsive grid columns and gaps */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label> {/* Responsive font size */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" /> {/* Responsive icon size */}
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing || isSubmitting}
                    className="pl-10 text-sm sm:text-base" // Responsive font size
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing || isSubmitting}
                    className="pl-10 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing || isSubmitting}
                    className="pl-10 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm sm:text-base">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing || isSubmitting}
                    className="pl-10 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Password Change Section */}
            <AnimatePresence> {/* For animating password fields in/out */}
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden" // Hide overflow during height animation
                >
                  <div className="relative my-6 sm:my-8"> {/* Responsive vertical margin */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm uppercase"> {/* Responsive font size */}
                      <span className="bg-white px-2 text-gray-500">Change Password</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"> {/* Responsive grid columns and gaps */}
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-sm sm:text-base">Current Password</Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="pl-10 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-sm sm:text-base">New Password</Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="pl-10 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 col-span-1 sm:col-span-2"> {/* Ensure this spans two columns on sm+ */}
                      <Label htmlFor="confirmPassword" className="text-sm sm:text-base">Confirm New Password</Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="pl-10 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>


            {/* Submit Button */}
            <AnimatePresence> {/* For animating button in/out */}
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-end pt-4 sm:pt-6" // Responsive padding-top
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 w-full sm:w-auto" // Full width on mobile, auto on sm+
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> {/* Used Loader2 from lucide-react */}
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.form>
    </motion.div>
  );
};

// This is how you would use FarmerLayout to wrap FarmerProfile
// Create a wrapper component if FarmerProfile is a direct route component
const WrappedFarmerProfile = () => (
  <FarmerLayout 
    title="My Profile" 
    subtitle="Manage your personal information and settings"
  >
    <FarmerProfile />
  </FarmerLayout>
);

export default WrappedFarmerProfile;