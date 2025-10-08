import { FaGoogle } from 'react-icons/fa';


const LoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/users/auth/google';
  };

  return (
    <div className="space-y-4 w-full max-w-sm">
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-white border-2 border-gray-200 text-gray-700 px-6 py-4 rounded-2xl font-semibold hover:border-blue-300 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-3 group"
      >
        <FaGoogle className="w-5 h-5 text-[#636d1e] group-hover:scale-110 transition-transform" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default LoginButton;