import { useState } from 'react';
import axios from 'axios';
import { Shield, CheckCircle, AlertCircle, Clock, User, Key, Smartphone, FileCheck } from 'lucide-react';

interface EkycResult {
  data: {
    session_id?: string;
    captcha?: string;
    [key: string]: unknown;
  };
  transaction_id?: string;
  [key: string]: unknown;
}

const EkycForm = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [result, setResult] = useState<EkycResult | null>(null);
  const [step, setStep] = useState<'start' | 'captcha' | 'otp' | 'done'>('start');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/ekyc/connect`, {
        aadhaarNumber,
      });

      const data = res.data;

      // Set captcha and session-related info
      setSessionId(data.data?.session_id || '');
      setCaptchaImage(data.data?.captcha || ''); // base64 string
      setStep('captcha');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError('Verification failed: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCaptcha = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/ekyc/generate-otp', {
        aadhaarNumber,
        captcha,
        sessionId,
      });

      setResult(res.data);
      setStep('otp');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError('OTP generation failed: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = async () => {
    setLoading(true);
    setError('');
    
    try {
        const token = localStorage.getItem('token'); // ✅ Retrieve the stored token
        
        if (!token) {
            setError('Authentication token not found. Please log in again.');
            setLoading(false);
            return;
        }

        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/ekyc/verify-otp`,
            {
                otp,
                sessionId,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}` // ✅ Add the token to the header
                }
            }
        );

        setResult(res.data);
        setStep('done');

        // Redirect to dashboard after successful verification
        setTimeout(() => {
            // Get user role from localStorage or context to determine dashboard
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.role === "admin") {
                window.location.href = "/admin/dashboard";
            } else if (user.role === "farmer") {
                window.location.href = "/farmer/dashboard";
            } else if (user.role === "delivery_partner") {
                window.location.href = "/delivery-partner/dashboard";
            } else if (user.role === "store_manager") {
                window.location.href = "/store_manager/dashboard";
            } else if (user.role === "vendor") {
                window.location.href = "/vendor/dashboard";
            } else {
                window.location.href = "/";
            }
        }, 2000); // Redirect after 2 seconds
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError('OTP verification failed: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }; // ✅ This closing brace was misplaced. It is now correctly here.

  const getStepIcon = (stepName: string, isActive: boolean, isCompleted: boolean) => {
    const iconClass = `w-6 h-6 ${isActive ? 'text-white' : isCompleted ? 'text-emerald-600' : 'text-gray-400'}`;
    
    switch (stepName) {
      case 'start':
        return <User className={iconClass} />;
      case 'captcha':
        return <Key className={iconClass} />;
      case 'otp':
        return <Smartphone className={iconClass} />;
      case 'done':
        return <FileCheck className={iconClass} />;
      default:
        return <Shield className={iconClass} />;
    }
  };

  const getStepNumber = (stepName: string) => {
    const steps = ['start', 'captcha', 'otp', 'done'];
    return steps.indexOf(stepName) + 1;
  };

  const isStepCompleted = (stepName: string) => {
    const steps = ['start', 'captcha', 'otp', 'done'];
    const currentIndex = steps.indexOf(step);
    const stepIndex = steps.indexOf(stepName);
    return stepIndex < currentIndex;
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 ease-in-out"
            style={{ width: `${((getStepNumber(step) - 1) / 3) * 100}%` }}
          />
        </div>
        
        {['start', 'captcha', 'otp', 'done'].map((stepName, _) => {
          const isActive = step === stepName;
          const isCompleted = isStepCompleted(stepName);
          
          return (
            <div key={stepName} className="flex flex-col items-center relative z-10">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${isActive 
                  ? 'bg-naturopura-gradient shadow-lg scale-110' 
                  : isCompleted 
                    ? 'bg-white ' 
                    : 'bg-white'
                }
              `}>
                {getStepIcon(stepName, isActive, isCompleted)}
              </div>
              <span className={`
                mt-2 text-xs font-medium transition-colors duration-300
                ${isActive ? 'naturopura-text' : isCompleted ? 'naturopura-text' : 'text-gray-400'}
              `}>
                {stepName === 'start' ? 'Aadhaar' : 
                 stepName === 'captcha' ? 'Captcha' : 
                 stepName === 'otp' ? 'OTP' : 'Complete'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-naturopura-gradient rounded-full mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Aadhaar Verification</h1>
          <p className="text-gray-600">Secure identity verification in simple steps</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <StepIndicator />

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Step: Start */}
          {step === 'start' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter Aadhaar Number</h2>
                <p className="text-gray-600 text-sm">Please provide your 12-digit Aadhaar number to begin verification</p>
              </div>
              
              <form onSubmit={handleStartVerification} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter 12-digit Aadhaar Number"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 text-lg tracking-wider"
                    maxLength={12}
                    pattern="[0-9]{12}"
                    title="Please enter a valid 12-digit Aadhaar number"
                    required
                    disabled={loading}
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading || aadhaarNumber.length !== 12}
                  className="w-full bg-naturopura-gradient text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Start Verification</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step: Captcha */}
          {step === 'captcha' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Verify Captcha</h2>
                <p className="text-gray-600 text-sm">Please enter the characters shown in the image below</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <img
                    src={`data:image/jpeg;base64,${captchaImage}`}
                    alt="Captcha"
                    className="w-full h-20 object-contain bg-white rounded border"
                  />
                </div>
                
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter Captcha Text"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 text-lg"
                    required
                    disabled={loading}
                  />
                </div>
                
                <button 
                  onClick={handleSubmitCaptcha} 
                  disabled={loading || !captcha.trim()}
                  className="w-full bg-naturopura-gradient text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Generating OTP...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Submit Captcha</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step: OTP */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter OTP</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <p className="text-blue-800 text-sm font-medium">OTP has been sent to your registered mobile number</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 text-lg tracking-widest text-center"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit OTP"
                    required
                    disabled={loading}
                  />
                </div>
                
                <button 
                  onClick={handleSubmitOtp} 
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-naturopura-gradient text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Verify OTP</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step: Done */}
          {step === 'done' && result && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Successful!</h2>
                <p className="text-gray-600 text-sm">Your Aadhaar verification has been completed successfully</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <FileCheck className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Verification Details</h3>
                </div>
                <div className="bg-white rounded border p-3">
                  <pre className="text-xs text-gray-700 overflow-auto whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <Clock className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-800 text-sm font-medium">Redirecting to your dashboard in 2 seconds...</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Powered by secure Aadhaar verification system
          </p>
        </div>
      </div>
    </div>
  );
};

export default EkycForm;