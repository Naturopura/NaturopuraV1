import React, { useState, useCallback } from "react";
import axios from "axios";
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
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingParticles from '../home/FloatingParticles';

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
}

const InputField = React.memo(
  ({ id, label, icon, onToggle, toggleIcon, ...props }: InputFieldProps) => {
    const inputId = id || props.name;
    return (
      <div className="mb-6 flex flex-col">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 text-sm font-semibold text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="flex items-center bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/50 shadow-lg transition-all duration-300 hover:bg-white/70 focus-within:bg-white/80 focus-within:ring-2 focus-within:ring-blue-300/50">
          {icon && <span className="mr-3 text-blue-600">{icon}</span>}
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
      </div>
    );
  }
);

const Register: React.FC = () => {
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
  const [error, setError] = useState<string>("");
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
    },
    []
  );

  const goToPreviousStep = () => {
    setError("");
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const validateStep1 = (): boolean => {
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Please enter a password.");
      return false;
    }
    if (!formData.aadhaarNumber.trim()) {
      setError("Please enter your Aadhaar number.");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Please enter your phone number.");
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    if (!formData.address.trim()) {
      setError("Please enter your address.");
      return false;
    }
    if (!formData.farmSize || Number(formData.farmSize) <= 0) {
      setError("Please enter a valid farm size.");
      return false;
    }
    if (!formData.cropTypes.trim()) {
      setError("Please enter crop types.");
      return false;
    }
    return true;
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
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
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        payload
      );
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
      console.log(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const StatusMessage = ({ type, message }: { type: 'error' | 'success'; message: string }) => (
    <motion.div
      role={type === 'error' ? "alert" : "status"}
      aria-live={type === 'error' ? "assertive" : "polite"}
      className={`mb-6 font-semibold p-4 rounded-2xl border backdrop-blur-md ${
        type === 'error' 
          ? 'text-red-600 bg-red-100/60 border-red-200/50'
          : 'text-green-600 bg-green-100/60 border-green-200/50'
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {message}
    </motion.div>
  );

  const renderStep1Form = () => (
    <form onSubmit={handleStep1Submit} className="space-y-6">
      <InputField
        icon={<LucideUser />}
        name="name"
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        label="Full Name"
      />
      <InputField
        icon={<LucideMail />}
        name="email"
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        label="Email"
      />
      <InputField
        icon={<LucideLock />}
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        label="Password"
        toggleIcon={showPassword ? <LucideEyeOff /> : <LucideEye />}
        onToggle={() => setShowPassword((prev) => !prev)}
      />
      <InputField
        icon={<LucideShieldCheck />}
        name="aadhaarNumber"
        type="text"
        placeholder="Aadhaar Number (12 digits)"
        value={formData.aadhaarNumber}
        onChange={handleChange}
        label="Aadhaar Number"
      />
      <InputField
        icon={<LucidePhone />}
        name="phoneNumber"
        type="tel"
        placeholder="+919876543210"
        value={formData.phoneNumber}
        onChange={handleChange}
        label="Phone Number"
      />
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 py-4 text-white font-semibold transition-all duration-300 shadow-xl flex items-center justify-center group"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
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
        placeholder="Farm Address"
        value={formData.address}
        onChange={handleChange}
        label="Farm Address"
      />
      <InputField
        icon={<LucideRuler />}
        name="farmSize"
        type="number"
        placeholder="Farm Size (in acres)"
        value={formData.farmSize}
        onChange={handleChange}
        label="Farm Size"
      />
      <InputField
        icon={<LucideCrop />}
        name="cropTypes"
        type="text"
        placeholder="Crop Types (comma separated)"
        value={formData.cropTypes}
        onChange={handleChange}
        label="Crop Types"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          icon={<LucideMapPin />}
          name="latitude"
          type="text"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          label="Latitude"
        />
        <InputField
          icon={<LucideMapPin />}
          name="longitude"
          type="text"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          label="Longitude"
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
          className="rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3 text-white font-semibold transition-all duration-300 shadow-xl flex items-center justify-center group"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <LucideLoader2 className="animate-spin" />
          ) : (
            <>
              🎉 Register
              <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </motion.button>
      </div>
    </form>
  );

  const renderNavigationLinks = () => (
    <div className="space-y-3 text-center text-gray-600 text-sm">
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="flex flex-col md:flex-row min-h-screen relative z-10">
        {/* Left Content - Hidden on Mobile */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-12">
          <motion.div
            className="text-center max-w-lg space-y-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl font-bold mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 text-transparent bg-clip-text">
                Welcome to Naturopura
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              🌱 Empowering farmers with digital innovation. Join our community of sustainable agriculture pioneers.
            </motion.p>
            <motion.div
              className="flex justify-center space-x-6 mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">₹100Cr+</div>
                <div className="text-sm text-gray-600">Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-gray-600">States</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Content - Form Section */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <motion.div
            className="w-full max-w-2xl bg-white/60 backdrop-blur-md p-10 rounded-3xl border border-white/50 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Form Header */}
            <div className="mb-8 text-center">
              <motion.h2 
                className="text-4xl font-bold mb-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
                  Register to Naturopura
                </span>
              </motion.h2>
              <motion.div
                className="flex items-center justify-center space-x-2 text-gray-600"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className={`w-8 h-2 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <div className={`w-8 h-2 rounded-full ${step >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="ml-2 text-sm font-medium">Step {step} of 2</span>
              </motion.div>
            </div>

            {/* Status Messages */}
            {error && <StatusMessage type="error" message={error} />}
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
              className="mt-8"
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