import { Routes, Route,  Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PrivateRoute from "../components/auth/PrivateRoute";
import ErrorBoundary from "./ErrorBoundary";

// --- Import all your components here ---
// Authentication & Core
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import DeliveryPartnerRegister from "../components/auth/DeliveryPartnerRegister";
import VendorRegister from "../components/auth/VendorRegister";
import Home from "../pages/home/Home";
import StoreManagerRegister from "../components/auth/StoreManagerRegister";
import OAuthCallback from "../components/auth/OAuthCallback";
import ContactForm from "../components/contact/ContactUs";

// Password

import ForgotPassword from "../pages/password/ForgotPassword";
import ResetPassword from "../pages/password/ResetPassword";

// Dashboards
import FarmerDashboard from "../components/dashboard/FarmerDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import Dashboard from "../components/vendor/VendorDashboard";
import DeliveryPartnerDashboard from "../components/deliveryPartner/DeliveryPartnerDashboard";
import StoreManagerDashboard from "../components/storeManager/StoreManagerDashboard";

// Profiles
import AdminProfile from "../components/admin/AdminProfile";
import FarmerProfile from "../components/farmer/FarmerProfile";

// Loans
import LoanApplication from "../components/loan/LoanApplication";
import LoanHistory from "../components/loan/LoanHistory";
import AdminLoans from "../pages/admin/AdminLoans";

import IdentityVerification from "../pages/home/IdentityVerification";
import FinancialServices from "../pages/home/FinancialServices";
import Marketplace from "../pages/home/MarketPlace";
import SmartFarming from "../pages/home/SmartFarming";

// KYC
import EkycForm from "../components/ekyc/EkycForm";
import EkycStatusCard from "../components/farmer/EkycStatusCard";

// Marketplace
import MarketplacePage from "../pages/MarketPlace"; // Farmer's Marketplace
import AdminMarketplace from "../pages/admin/AdminMarketplace"; // Admin's Marketplace view

import AdminLogistics from "../components/admin/AdminLogistics";
import AdminPurchasedProductList from "../components/admin/AdminPurchasedProductList";
import PurchasedProductsDelivery from "../components/deliveryPartner/PurchasedProductsDelivery";

import ProductPage from "../pages/ProductPage";

import StoreManagerApproval from "../components/admin/StoreManagerApproval";
const OrderManagement = () => <div>Order Management</div>; // Placeholder component

// Subsidies
import AllSubsidies from "../components/subsidy/AllSubsidies"; // Admin view
import ApplySubsidyForm from "../components/subsidy/ApplySubsidyForm"; // Farmer form
import MySubsidies from "../components/subsidy/MySubsidies"; // Farmer's list

// Insurance
import AllInsurance from "../components/insurance/AllInsurance"; // Admin view
import ApplyInsuranceForm from "../components/insurance/ApplyInsuranceForm"; // Farmer form
import MyInsurance from "../components/insurance/MyInsurance"; // Farmer's list

// Crop Health & Monitoring
import CropHealthDetection from "../components/crop/CropHealthDetection";
import SoilTest from "../components/soil/SoilTesting";
import MotionEvent from "../components/sensor/MotionEvent";
import WeatherAlert from "../components/weather/WeatherAlert";
import AiChatBox from "../components/ai/AiChatBox";

const AIInsights = () => <div>AI Insights</div>; // Placeholder component

//Drone
import ScheduleDrone from "../components/drone/ScheduleDrone";
import DroneScheduleList from "../components/drone/DroneScheduleList";
import MyDroneSchedules from "../components/drone/MyDroneSchedules";
import FarmerColdStoreTracker from "../components/farmer/FarmerColdStoreTracker";


// Admin-specific
import { default as FarmerList } from "../components/admin/FarmerList";
import DeliveryPartnerApproval from "../components/admin/DeliveryPartnerApproval";
import EquipmentSearch from "../components/farmer/EquipmentSearch";

// Feedback
import AdminFeedbackList from "../feedback/AdminFeedback";
import FeedbackForm from "../feedback/FeedbackForm";
import VendorApproval from "../components/admin/VendorApproval";
import EquipmentRequestManagement from "../components/admin/EquipmentRequestManagement";
import EquipmentRequestList from "../components/farmer/EquipmentRequestList";

// Placeholder for Support (if it's a dedicated component)
const Support = () => <div>Support</div>;


/**
 * Defines all application routes.
 * This component handles navigation logic based on user roles.
 */
const AppRoutes = () => {
  const { user } = useAuth();

  const ProtectedHome = () => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return (
      <Navigate
        to={
          user.role === "admin"
            ? "/admin/dashboard"
            : user.role === "delivery_partner"
            ? "/delivery-partner/dashboard"
            : "/farmer/dashboard"
        }
        replace
      />
    );
  };

  return (
    <ErrorBoundary>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/store-manager/register"
          element={<StoreManagerRegister />}
        />
        <Route
          path="/delivery-partner/register"
          element={<DeliveryPartnerRegister />}
        />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route
          path="/delivery-partner/dashboard"
          element={
            <PrivateRoute allowedRoles={["delivery_partner"]}>
              <DeliveryPartnerDashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="purchased-products"
            element={
              <PrivateRoute allowedRoles={["delivery_partner"]}>
                <PurchasedProductsDelivery />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route
          path="/admin/logistics/:productId"
          element={<AdminLogistics />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/marketplace"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminMarketplace />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/loans"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminLoans />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/farmers"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <FarmerList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/subsidies"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AllSubsidies />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/insurance"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AllInsurance />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/feedback"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminFeedbackList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/delivery-partners"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <DeliveryPartnerApproval />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/store-managers"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <StoreManagerApproval />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/vendors"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <VendorApproval />
            </PrivateRoute>
          }
        />
        <Route
          path="store_manager/dashboard"
          element={
            <PrivateRoute allowedRoles={["store_manager"]}>
              <StoreManagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/logistics/:productId"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminLogistics />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/purchases"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminPurchasedProductList />
            </PrivateRoute>
          }
        />

        {/* Farmer Routes */}
        <Route
          path="/farmer/dashboard"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <FarmerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/delivery_partner/dashboard"
          element={
            <PrivateRoute allowedRoles={["delivery_partner"]}>
              <DeliveryPartnerDashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="purchased-products"
            element={
              <PrivateRoute allowedRoles={["delivery_partner"]}>
                <PurchasedProductsDelivery />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="/product/:productId"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <ProductPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/farmer/profile"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <FarmerProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/loans/apply"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <LoanApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/loans/history"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <LoanHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/financial-services"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <FinancialServices />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/subsidies/apply"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <ApplySubsidyForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/subsidies"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <MySubsidies />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/insurance/apply"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <ApplyInsuranceForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/insurance"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <MyInsurance />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/marketplace/orders"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <MarketplacePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/orders"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <OrderManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/farmer/monitoring/weather"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <WeatherAlert />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/monitoring/soil"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <SoilTest />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/ai-insights"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <AIInsights />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/drone/schedule"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <ScheduleDrone />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/drone/my-schedules"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <MyDroneSchedules />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/cold-store-tracker"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <FarmerColdStoreTracker />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/protection/sensors"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <MotionEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/drone/schedules"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <DroneScheduleList />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/support"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <Support />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/ekyc"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <EkycForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/ekyc/status"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <EkycStatusCard />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/feedback"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <FeedbackForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/monitoring/pests"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <CropHealthDetection />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer/monitoring/ai/insights"
          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <AiChatBox />
            </PrivateRoute>
          }
        />
       
        <Route
          path="/vendor/dashboard"
          element={
            <PrivateRoute allowedRoles={["vendor"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
        path="/farmer/equipment/search"
        element={
          <PrivateRoute allowedRoles={["farmer"]}>
            <EquipmentSearch />
          </PrivateRoute>
        }
      />
      <Route
      path="/admin/equipment"
      element={
        <PrivateRoute allowedRoles={["admin"]}>
          <EquipmentRequestManagement/>
        </PrivateRoute>
      }
    />
        <Route
          path="/farmer/equipment/requests"

          element={
            <PrivateRoute allowedRoles={["farmer"]}>
              <EquipmentRequestList />
            </PrivateRoute>
          }
        />
      

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/feature/identity" element={<IdentityVerification />} />
        <Route path="/feature/finance" element={<FinancialServices />} />
        <Route path="/feature/marketplace" element={<Marketplace />} />
        <Route path="/feature/smartfarming" element={<SmartFarming />} />
        <Route path="/feature/contact" element={<ContactForm />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
