import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createApiClient, ENDPOINTS, handleApiError } from "../../config/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import FarmerLayout from "../layouts/FarmerLayout";
import { useToast } from "../ui/use-toast";
import {
  Clock,
  IndianRupee,
  Leaf,
  ShieldCheck,
  Sprout,
} from "lucide-react";

// Types
interface FormData {
  amount: string;
  purpose: string;
  term: string;
  collateral: string;
  cropType: string;
  landSize: string;
  farmDetails: string;
}

interface FormErrors {
  amount?: string;
  purpose?: string;
  term?: string;
  collateral?: string;
  cropType?: string;
  landSize?: string;
  farmDetails?: string;
  submit?: string;
}

// Add ApiError type
interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message: string;
}

// Constants
const LOAN_PURPOSES = [
  { value: "seeds", label: "Seeds Purchase" },
  { value: "equipment", label: "Equipment Purchase" },
  { value: "irrigation", label: "Irrigation System" },
  { value: "land", label: "Land Development" },
  { value: "other", label: "Other" },
];

const LOAN_TERMS = [
  { value: "3months", label: "3 Months" },
  { value: "6months", label: "6 Months" },
  { value: "1year", label: "1 Year" },
  { value: "2years", label: "2 Years" },
  { value: "5years", label: "5 Years" },
];

const CROP_TYPES = [
  { value: "rice", label: "Rice" },
  { value: "wheat", label: "Wheat" },
  { value: "cotton", label: "Cotton" },
  { value: "sugarcane", label: "Sugarcane" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "other", label: "Other" },
];

const LoanApplication = () => {
  const { token, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    amount: "",
    purpose: "",
    term: "",
    collateral: "",
    cropType: "",
    landSize: "",
    farmDetails: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.purpose) newErrors.purpose = "Purpose is required";
    if (!formData.term) newErrors.term = "Term is required";
    if (!formData.collateral) newErrors.collateral = "Collateral is required";
    if (!formData.cropType) newErrors.cropType = "Crop type is required";
    if (!formData.landSize) newErrors.landSize = "Land size is required";
    if (!formData.farmDetails) newErrors.farmDetails = "Farm details are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to access loan applications",
        variant: "destructive",
      });
      navigate("/login", { state: { from: "/farmer/loans/apply" } });
    }
  }, [isAuthenticated, loading, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!token || !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to submit a loan application",
        variant: "destructive",
      });
      navigate("/login", { state: { from: "/farmer/loans/apply" } });
      return;
    }

    setIsSubmitting(true);
    try {
      const apiClient = createApiClient(token);
      const response = await apiClient.post(ENDPOINTS.CREATE_LOAN, {
        ...formData,
        amount: parseFloat(formData.amount),
        landSize: parseFloat(formData.landSize),
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Loan application submitted successfully",
        });
        setTimeout(() => navigate("/farmer/loans/history"), 2000);
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.response?.status === 401) {
        toast({
          title: "Session Expired",
          description: "Please login again.",
          variant: "destructive",
        });
        navigate("/login", { state: { from: "/farmer/loans/apply" } });
        return;
      }
      setErrors({ submit: handleApiError(apiError) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (loading) {
    return (
      <FarmerLayout title="Loan Application" subtitle="Apply for a new loan">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
        </div>
      </FarmerLayout>
    );
  }

  return (
    <FarmerLayout title="Loan Application" subtitle="Apply for a new agricultural loan">
      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Benefits Section */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-xl text-emerald-900">Loan Benefits</CardTitle>
                </div>
                <CardDescription>Why choose our agricultural loans?</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  {
                    icon: IndianRupee,
                    title: "Competitive Interest Rates",
                    description: "Starting from 7% per annum with flexible repayment options",
                  },
                  {
                    icon: Clock,
                    title: "Quick Processing",
                    description: "Get approval within 48–72 hours of application",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Secure & Transparent",
                    description: "No hidden charges with full transparency",
                  },
                  {
                    icon: Sprout,
                    title: "Farmer Focused",
                    description: "Tailored loans specifically for agricultural needs",
                  },
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white">
                    <div className="p-2 rounded-full bg-emerald-100">
                      <benefit.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-emerald-900">{benefit.title}</h3>
                      <p className="text-sm text-emerald-700/70">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Steps to Apply Section */}
            <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-xl text-emerald-900">Steps to Apply</CardTitle>
                </div>
                <CardDescription>Quick and easy steps to get your loan</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-emerald-800">
                <p>1. Fill out the application form with accurate details</p>
                <p>2. Submit valid land and farm information</p>
                <p>3. Wait for verification and loan approval</p>
                <p>4. Receive funds directly to your registered account</p>
              </CardContent>
            </Card>
          </div>

          {/* Loan Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Application Form</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {/* Amount */}
                <div>
                  <Label>Loan Amount (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                  />
                  {errors.amount && <p className="text-red-600 text-sm">{errors.amount}</p>}
                </div>

                {/* Purpose */}
                <div>
                  <Label>Purpose</Label>
                  <Select onValueChange={(value) => handleInputChange("purpose", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-sm">
                      {LOAN_PURPOSES.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.purpose && <p className="text-red-600 text-sm">{errors.purpose}</p>}
                </div>

                {/* Term */}
                <div>
                  <Label>Term</Label>
                  <Select onValueChange={(value) => handleInputChange("term", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-sm">
                      {LOAN_TERMS.map((term) => (
                        <SelectItem key={term.value} value={term.value}>
                          {term.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.term && <p className="text-red-600 text-sm">{errors.term}</p>}
                </div>

                {/* Collateral */}
                <div>
                  <Label>Collateral Details</Label>
                  <Input
                    placeholder="Describe collateral"
                    value={formData.collateral}
                    onChange={(e) => handleInputChange("collateral", e.target.value)}
                  />
                  {errors.collateral && <p className="text-red-600 text-sm">{errors.collateral}</p>}
                </div>

                {/* Crop Type */}
                <div>
                  <Label>Crop Type</Label>
                  <Select onValueChange={(value) => handleInputChange("cropType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-sm">
                      {CROP_TYPES.map((crop) => (
                        <SelectItem key={crop.value} value={crop.value}>
                          {crop.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cropType && <p className="text-red-600 text-sm">{errors.cropType}</p>}
                </div>

                {/* Land Size */}
                <div>
                  <Label>Land Size (in acres)</Label>
                  <Input
                    type="number"
                    placeholder="E.g., 3.5"
                    value={formData.landSize}
                    onChange={(e) => handleInputChange("landSize", e.target.value)}
                  />
                  {errors.landSize && <p className="text-red-600 text-sm">{errors.landSize}</p>}
                </div>

                {/* Farm Details */}
                <div>
                  <Label>Farm Description</Label>
                  <Textarea
                    placeholder="Describe your farm and farming activities"
                    value={formData.farmDetails}
                    onChange={(e) => handleInputChange("farmDetails", e.target.value)}
                  />
                  {errors.farmDetails && <p className="text-red-600 text-sm">{errors.farmDetails}</p>}
                </div>

                {/* Submit Error */}
                {errors.submit && <p className="text-red-600 text-sm">{errors.submit}</p>}

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </FarmerLayout>
  );
};

export default LoanApplication;
