import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "farmer") {
      navigate("/farmer/dashboard");
    } else if (user?.role === "delivery_partner") {
      navigate("/delivery-partner/dashboard");
    } else if (user?.role === "store_manager") {
      navigate("/store-manager/dashboard");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return <p className="text-center mt-20">Redirecting...</p>;
};

export default OAuthCallback;
