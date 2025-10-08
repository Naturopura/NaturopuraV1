import React, { useState, useCallback, useEffect } from "react";
import { createApiClient, ENDPOINTS } from "../../config/api";
import {
  LucideEye,
  LucideEyeOff,
  LucideMail,
  LucideLock,
  LucideLoader2,
  LucideUser,
  LucidePhone,
  LucideMapPin,
  LucideRuler,
  LucideCrop,
  LucideShieldCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  aadhaarNumber: string;
  phoneNumber: string;
  address: string;
  farmSize: string;
  cropTypes: string;
  latitude: string;
  longitude: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface InputFieldProps {
  id?: string;
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  onToggle?: () => void;
  toggleIcon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const InputField = React.memo(
  ({
    id,
    label,
    icon,
    onToggle,
    toggleIcon,
    error,
    required,
    ...props
  }: InputFieldProps) => {
    const inputId = id || props.name;
    const hasError = !!error;

    return (
      <div className="mb-6 flex flex-col">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 text-sm font-semibold text-gray-700 flex items-center"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div
          className={`flex items-center bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 border transition-all duration-300 hover:bg-white/70 focus-within:bg-white/80 shadow-lg ${
            hasError
              ? "border-red-300 focus-within:ring-2 focus-within:ring-red-300/50"
              : "border-white/50 focus-within:ring-2 focus-within:ring-blue-300/50"
          }`}
        >
          {icon && (
            <span
              className={`mr-3 ${hasError ? "text-red-500" : "text-blue-600"}`}
            >
              {icon}
            </span>
          )}
          <input
            id={inputId}
            {...props}
            className="bg-transparent outline-none flex-grow text-gray-700 placeholder-gray-500"
          />
          {onToggle && (
            <button
              type="button"
              onClick={onToggle}
              aria-label={
                props.type === "password"
                  ? "Toggle password visibility"
                  : "Toggle input"
              }
              className="ml-2 text-blue-600 hover:text-blue-700 focus:outline-none transition-colors"
            >
              {toggleIcon}
            </button>
          )}
        </div>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center text-red-600 text-sm"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </motion.div>
        )}
      </div>
    );
  }
);

const Register: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    role: "farmer",
    aadhaarNumber: "",
    phoneNumber: "",
    address: "",
    farmSize: "",
    cropTypes: "",
    latitude: "",
    longitude: "",
  });

  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateAadhaar = (aadhaar: string): boolean => {
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(aadhaar.replace(/\s/g, ""));
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[\d\s-()]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateLatitude = (lat: string): boolean => {
    if (!lat) return true; // Optional field
    const num = parseFloat(lat);
    return !isNaN(num) && num >= -90 && num <= 90;
  };

  const validateLongitude = (lng: string): boolean => {
    if (!lng) return true; // Optional field
    const num = parseFloat(lng);
    return !isNaN(num) && num >= -180 && num <= 180;
  };

  const validateStep1 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!formData.aadhaarNumber.trim()) {
      newErrors.aadhaarNumber = "Aadhaar number is required";
    } else if (!validateAadhaar(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Please enter a valid 12-digit Aadhaar number";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "Farm address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please provide a complete address";
    }

    if (!formData.farmSize.trim()) {
      newErrors.farmSize = "Farm size is required";
    } else if (
      isNaN(Number(formData.farmSize)) ||
      Number(formData.farmSize) <= 0
    ) {
      newErrors.farmSize = "Please enter a valid farm size in acres";
    }

    if (!formData.cropTypes.trim()) {
      newErrors.cropTypes = "Crop types are required";
    } else if (formData.cropTypes.trim().length < 3) {
      newErrors.cropTypes = "Please provide valid crop types";
    }

    if (formData.latitude && !validateLatitude(formData.latitude)) {
      newErrors.latitude = "Please enter a valid latitude (-90 to 90)";
    }

    if (formData.longitude && !validateLongitude(formData.longitude)) {
      newErrors.longitude = "Please enter a valid longitude (-180 to 180)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToPreviousStep = () => {
    setErrors({});
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (!validateStep2()) return;

    setLoading(true);

    const payload = {
      ...formData,
      farmSize: formData.farmSize ? Number(formData.farmSize) : 0,
      cropTypes: formData.cropTypes
        ? formData.cropTypes.split(",").map((c) => c.trim())
        : [],
      location: {
        latitude: formData.latitude ? Number(formData.latitude) : 0,
        longitude: formData.longitude ? Number(formData.longitude) : 0,
      },
    };

    try {
      const res = await createApiClient().post(ENDPOINTS.REGISTER, payload);
      console.log("Registration response:", res.data);

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "farmer",
        aadhaarNumber: "",
        phoneNumber: "",
        address: "",
        farmSize: "",
        cropTypes: "",
        latitude: "",
        longitude: "",
      });
      setStep(1);
      setErrors({});
    } catch (err: unknown) {
      const errorMessage =
        (err as any)?.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const StatusMessage = ({
    type,
    message,
  }: {
    type: "error" | "success";
    message: string;
  }) => (
    <motion.div
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      className={`mb-6 font-semibold p-4 rounded-2xl border backdrop-blur-md flex items-center ${
        type === "error"
          ? "text-red-600 bg-red-100/60 border-red-200/50"
          : "text-green-600 bg-green-100/60 border-green-200/50"
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {type === "error" ? (
        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
      ) : (
        <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
      )}
      {message}
    </motion.div>
  );

  const renderStep1Form = () => (
    <form onSubmit={handleStep1Submit} className="space-y-6">
      <InputField
        icon={<LucideUser   />}
        name="name"
        type="text"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
        label="Full Name"
        error={errors.name}
        required
      />
      <InputField
        icon={<LucideMail  />}
        name="email"
        type="email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={handleChange}
        label="Email Address"
        error={errors.email}
        required
      />
      <InputField
        icon={<LucideLock  />}
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a strong password"
        value={formData.password}
        onChange={handleChange}
        label="Password"
        error={errors.password}
        toggleIcon={showPassword ? <LucideEyeOff /> : <LucideEye />}
        onToggle={() => setShowPassword((prev) => !prev)}
        required
      />
      <InputField
        icon={<LucideShieldCheck  />}
        name="aadhaarNumber"
        type="text"
        placeholder="Enter 12-digit Aadhaar number"
        value={formData.aadhaarNumber}
        onChange={handleChange}
        label="Aadhaar Number"
        error={errors.aadhaarNumber}
        required
      />
      <InputField
        icon={<LucidePhone  />}
        name="phoneNumber"
        type="tel"
        placeholder="Enter your phone number"
        value={formData.phoneNumber}
        onChange={handleChange}
        label="Phone Number"
        error={errors.phoneNumber}
        required
      />
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-naturopura-gradient py-4 text-white font-semibold transition-all duration-300 shadow-xl flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        {loading ? (
          <LucideLoader2 className="animate-spin" />
        ) : (
          <>
            Next Step
            <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </motion.button>
    </form>
  );

  const renderStep2Form = () => (
    <form onSubmit={handleStep2Submit} className="space-y-6">
      <InputField
        icon={<LucideMapPin />}
        name="address"
        type="text"
        placeholder="Enter your complete farm address"
        value={formData.address}
        onChange={handleChange}
        label="Farm Address"
        error={errors.address}
        required
      />
      <InputField
        icon={<LucideRuler />}
        name="farmSize"
        type="number"
        placeholder="Enter farm size in acres"
        value={formData.farmSize}
        onChange={handleChange}
        label="Farm Size (in acres)"
        error={errors.farmSize}
        required
      />
      <InputField
        icon={<LucideCrop />}
        name="cropTypes"
        type="text"
        placeholder="e.g., Rice, Wheat, Sugarcane"
        value={formData.cropTypes}
        onChange={handleChange}
        label="Crop Types (comma separated)"
        error={errors.cropTypes}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          icon={<LucideMapPin />}
          name="latitude"
          type="text"
          placeholder="Optional: Latitude"
          value={formData.latitude}
          onChange={handleChange}
          label="Latitude (Optional)"
          error={errors.latitude}
        />
        <InputField
          icon={<LucideMapPin />}
          name="longitude"
          type="text"
          placeholder="Optional: Longitude"
          value={formData.longitude}
          onChange={handleChange}
          label="Longitude (Optional)"
          error={errors.longitude}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <motion.button
          type="button"
          onClick={goToPreviousStep}
          className="rounded-2xl border-2 border-gray-300 bg-white/60 backdrop-blur-md px-8 py-3 text-gray-700 transition-all duration-300 hover:bg-white/80 font-semibold"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
        <motion.button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-naturopura-gradient px-8 py-3 text-white font-semibold transition-all duration-300 shadow-xl flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (
            <LucideLoader2 className="animate-spin" />
          ) : (
            <>
              Complete Registration
              <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </motion.button>
      </div>
    </form>
  );

  const renderNavigationLinks = () => (
    <div className="space-y-2 xl:space-y-3 text-center text-gray-600 text-xs xl:text-sm">
      <div>
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all duration-200"
        >
          Login here
        </a>
      </div>
      <div>
        Are you a delivery partner?{" "}
        <a
          href="/delivery-partner/register"
          className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-all duration-200"
        >
          Register here
        </a>
      </div>
      <div>
        Want to manage a cold storage?{" "}
        <a
          href="/store-manager/register"
          className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-all duration-200"
        >
          Register as Store Manager
        </a>
      </div>
      <div>
        Are you a vendor?{" "}
        <a
          href="/vendor/register"
          className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-all duration-200"
        >
          Register as Vendor
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full relative z-50 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-auto isolate">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-40">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen relative z-50 overflow-auto isolate">
        {/* Left Content - Hidden on Mobile */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-4 xl:p-10 min-h-screen -mt-40">
          <motion.div
            className="text-center max-w-md xl:max-w-lg space-y-6 xl:space-y-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/nat.svg"
              alt="Naturopura Logo"
              className="w-50 h-16 mx-auto mb-4"
            />

            <motion.h1
              className="text-4xl xl:text-6xl font-bold mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-naturopura-gradient">
                Welcome to Naturopura
              </span>
            </motion.h1>
            <motion.p
              className="text-lg xl:text-xl text-gray-600 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              🌱 Empowering farmers with digital innovation. Join our community
              of sustainable agriculture pioneers.
            </motion.p>
          </motion.div>
        </div>

        {/* Right Content - Form Section */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12">
          <motion.div
            className="w-full max-w-xl xl:max-w-2xl bg-white/60 backdrop-blur-md p-6 sm:p-8 xl:p-10 rounded-3xl border border-white/50 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Form Header */}
            <div className="mb-8 text-center">
              <motion.h2
                className="text-3xl xl:text-4xl font-bold mb-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-naturopura-gradient">
                  Register to Naturopura
                </span>
              </motion.h2>
              <motion.div
                className="flex items-center justify-center space-x-2 text-gray-600 mt-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div
                  className={`w-8 h-2 rounded-full transition-colors duration-300 ${
                    step >= 1 ? "bg-naturopura-gradient" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`w-8 h-2 rounded-full transition-colors duration-300 ${
                    step >= 2 ? "bg-naturopura-gradient" : "bg-gray-300"
                  }`}
                ></div>
                <span className="ml-2 text-sm font-medium">
                  Step {step} of 2
                </span>
              </motion.div>
            </div>

            {/* Status Messages */}
            {errors.submit && (
              <StatusMessage type="error" message={errors.submit} />
            )}
            {success && <StatusMessage type="success" message={success} />}

            {/* Form Steps */}
            <motion.div
              key={step}
              initial={{ opacity: 0, x: step === 2 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {step === 1 && renderStep1Form()}
              {step === 2 && renderStep2Form()}
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              className="mt-6 xl:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {renderNavigationLinks()}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
