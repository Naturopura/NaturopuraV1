import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {  Check, AlertCircle } from 'lucide-react';
import { toast } from "../ui/use-toast";
import FarmerLayout from "../layouts/FarmerLayout";
import { useAuth } from "../../context/AuthContext";
import { createApiClient, ENDPOINTS } from "../../config/api";
import {  ApiError } from '../../types/api';
import { AxiosProgressEvent } from 'axios';

// Update the documents state interface
interface DocumentState {
  aadhar: File | undefined;
  pan: File | undefined;
  selfie: File | undefined;
}

const EkycForm = () => {
  // Add verification state
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  // Update initial state to use undefined instead of null
  const [documents, setDocuments] = useState<DocumentState>({
    aadhar: undefined,
    pan: undefined,
    selfie: undefined
  });

  const { user, token, updateUser } = useAuth();
  const navigate = useNavigate();

  // Helper function to validate token
  const getAuthToken = (): string => {
    if (!token) {
      throw new Error('Authentication token not found');
    }
    return token;
  };

  // Check verification status on mount
  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        const authToken = getAuthToken();
        const apiClient = createApiClient(authToken);
        
        const response = await apiClient.get(ENDPOINTS.CHECK_PHONE_VERIFICATION);
        
        if (response.data.success && response.data.isVerified) {
          setIsVerified(true);
          setStep(2); // Automatically move to document upload step
        }
      } catch (error) {
        console.error('Failed to check verification status:', error);
      }
    };

    checkVerificationStatus();
  }, []);

  const sendOtp = async () => {
    try {
      const authToken = getAuthToken();
      const apiClient = createApiClient(authToken);

      if (!user?.phoneNumber) {
        toast({
          title: "Error",
          description: "Phone number not found",
          variant: "destructive",
        });
        return;
      }

      // Handle phone number with or without country code
      const formattedPhone = user.phoneNumber
        .replace(/^\+91/, '')    // Remove +91 prefix if present
        .replace(/\s+/g, '')     // Remove any whitespace
        .replace(/\D/g, '');     // Remove any remaining non-digits

      // Validate the phone number
      if (formattedPhone.length !== 10) {
        toast({
          title: "Error",
          description: "Phone number must be exactly 10 digits",
          variant: "destructive",
        });
        return;
      }

      const response = await apiClient.post(ENDPOINTS.SEND_OTP, {
        phoneNumber: formattedPhone
      });

      if (response.data.success) {
        setOtpSent(true);
        toast({
          title: "Success",
          description: "OTP sent successfully. Please check your phone.",
        });
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error('OTP send error:', {
        message: apiError.message,
        response: apiError.response?.data
      });
      
      if (apiError.response?.data?.code === 21660) {
        toast({
          title: "Service Temporarily Unavailable",
          description: "SMS service is currently unavailable. Please try again later or contact support.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send OTP. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  // Update verifyOtp function
  const verifyOtp = async () => {
    try {
      const authToken = getAuthToken();
      const apiClient = createApiClient(authToken);

      if (!user?.phoneNumber) {
        toast({
          title: "Error",
          description: "Phone number not found",
          variant: "destructive",
        });
        return;
      }

      const formattedPhone = user.phoneNumber
        .replace(/^\+91/, '')
        .replace(/\s+/g, '')
        .replace(/\D/g, '');

      const response = await apiClient.post(ENDPOINTS.VERIFY_OTP, {
        phoneNumber: formattedPhone,
        otp: otp.trim()
      });

      if (response.data.success) {
        setIsVerified(true);
        setStep(2);
        toast({
          title: "Success",
          description: "Phone number verified successfully",
        });
        
        // Update auth context if needed
        if (updateUser) {
          updateUser({
            ...user,
            isPhoneVerified: true,
            phoneVerifiedAt: new Date()
          });
        }
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error('OTP verification error:', {
        message: apiError.message,
        response: apiError.response?.data,
        phone: user?.phoneNumber
      });
      toast({
        title: "Error",
        description: apiError.response?.data?.message || "Invalid OTP",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: keyof DocumentState) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size too large. Maximum size is 5MB.');
      }

      // Validate file type
      const allowedTypes = type === 'selfie' 
        ? ['image/jpeg', 'image/png']
        : ['image/jpeg', 'image/png', 'application/pdf'];

      if (!allowedTypes.includes(file.type)) {
        throw new Error(`Invalid file type. Please upload ${type === 'selfie' ? 'JPG or PNG' : 'JPG, PNG or PDF'}`);
      }

      setDocuments(prev => ({ ...prev, [type]: file }));
      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`,
      });
    } catch (error) {
      const uploadError = error as Error;
      toast({
        title: "Error",
        description: uploadError.message || "Failed to upload document",
        variant: "destructive",
      });
      // Reset the input
      event.target.value = '';
    } finally {
      setIsUploading(false);
    }
  };

  const handleComplete = async () => {
    try {
      const authToken = getAuthToken();
      const apiClient = createApiClient(authToken);
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`
        },
        timeout: 30000,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          // Handle case where total might be undefined
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
          }
        },
      };

      // First verify if we have a valid token
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive"
        });
        return;
      }

      const verificationStatus = await apiClient.get(
        ENDPOINTS.CHECK_PHONE_VERIFICATION,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (!verificationStatus.data.isVerified) {
        toast({
          title: "Verification Required",
          description: "Please verify your phone number first",
          variant: "destructive"
        });
        setStep(1);
        return;
      }

      // Continue with document upload if verified
      if (!documents.aadhar || !documents.pan || !documents.selfie) {
        throw new Error('Please upload all required documents');
      }

      const formData = new FormData();
      
      // Include verification token from server
      formData.append('verificationToken', verificationStatus.data.verificationToken);
      
      // Add metadata including verification status
      if (user?.id) {
        formData.append('userId', user.id);
        formData.append('phoneVerified', 'true');
        formData.append('phoneNumber', user.phoneNumber || '');
      }
      
      // Append each file with proper naming
      for (const [key, file] of Object.entries(documents)) {
        if (!file) continue;
        
        // Create a unique filename
        const fileExtension = file.name.split('.').pop();
        const safeFileName = `${key}_${Date.now()}.${fileExtension}`;
        
        // Append file with new filename
        formData.append(key, file, safeFileName);
        
        // Append file metadata
        formData.append(`${key}Type`, file.type);
        formData.append(`${key}Size`, file.size.toString());
      }

      // Show loading state
      toast({
        title: "Uploading",
        description: "Please wait while we process your documents...",
      });

      const response = await apiClient.post(
        ENDPOINTS.VERIFY_EKYC,
        formData,
        config
      );

      if (response.data.success) {
        toast({
          title: "Success",
          description: "eKYC verification submitted successfully",
        });
        navigate('/farmer/ekyc/status');
      } else {
        throw new Error(response.data.message || 'Verification failed');
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error('eKYC Error:', {
        message: apiError.message,
        response: apiError.response?.data
      });
      
      // Handle specific error cases
      if (apiError.response?.status === 400) {
        toast({
          title: "Invalid Request",
          description: apiError.response.data?.message || "Please check your document formats and try again",
          variant: "destructive",
        });
      } else if (apiError.response?.status === 413) {
        toast({
          title: "Files Too Large",
          description: "One or more files exceed the maximum size limit",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to complete verification. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <FarmerLayout title="eKYC Verification" subtitle="Complete your identity verification">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Complete Your eKYC</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2 text-sm">
            <div className={`p-1 rounded-full ${step > 1 ? 'bg-green-500' : 'bg-yellow-500'}`}>
              {step > 1 ? <Check className="w-4 h-4 text-white" /> : <AlertCircle className="w-4 h-4 text-white" />}
            </div>
            <span>Phone Verification {step > 1 ? 'Complete' : 'Pending'}</span>
          </div>

          {step === 1 && !isVerified && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                First, let's verify your phone number
              </div>
              
              {!otpSent ? (
                <Button 
                  onClick={sendOtp} 
                  className="w-full"
                >
                  Send OTP
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                    />
                  </div>
                  <Button 
                    onClick={verifyOtp} 
                    className="w-full"
                    disabled={otp.length !== 6}
                  >
                    Verify OTP
                  </Button>
                </div>
              )}
            </div>
          )}

          {isVerified && step === 1 && (
            <div className="flex items-center gap-2 p-4 bg-green-50 rounded-md">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-green-700">Phone number verified successfully</span>
              <Button
                  variant="link"
                  onClick={() => setStep(2)}
              >
                  Continue to Document Upload
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="aadhar">Upload Aadhar Card</Label>
                <Input
                  id="aadhar"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => handleFileUpload(e, 'aadhar')}
                  disabled={isUploading}
                  className="cursor-pointer"
                />
              </div>

              <div>
                <Label htmlFor="pan">Upload PAN Card</Label>
                <Input
                  id="pan"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => handleFileUpload(e, 'pan')}
                  disabled={isUploading}
                  className="cursor-pointer"
                />
              </div>

              <Button 
                onClick={() => setStep(3)} 
                disabled={!documents.aadhar || !documents.pan}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Take a Selfie</Label>
                <Input
                  id="selfie"
                  type="file"
                  accept="image/jpeg,image/png"
                  capture="user"
                  onChange={(e) => handleFileUpload(e, 'selfie')}
                  disabled={isUploading}
                  className="cursor-pointer"
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="w-full"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleComplete}
                  disabled={!documents.selfie}
                  className="w-full"
                >
                  Complete Verification
                </Button>
              </div>
            </div>
          )
          }
        </CardContent>
      </Card>
    </FarmerLayout>
  );
};

export default EkycForm;