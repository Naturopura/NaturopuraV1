import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginPage from "./pages/MarketplaceLoginPage";
import BuySell from "./components/marketplace/BuySell";
import { AuthProvider } from './context/AuthContext';
import Home from "./pages/Home";
import Cart from "./components/marketplace/Cart";
import RazorpayPaymentFormWrapper from "./components/payment/RazorpayPaymentFormWrapper";
import MetaMaskPaymentWrapperPage from "./pages/MetaMaskPaymentWrapperPage";
import OrderSuccess from "./pages/OrderSuccess"; // New page for order success

import MarketPlacePage from "./pages/Marketplace";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/layouts/Layout";
import UserPurchasesList from "./components/marketplace/UserPurchasesList";
import PricingInfo from "./components/marketplace/PricingInfo";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import FarmerLogistics from "./components/marketplace/FarmerLogistics";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  const navigate = useNavigate();
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Login page should not be wrapped with Layout */}
          <Route path="/marketplace/login" element={<LoginPage />} />
          
          {/* All other routes should be wrapped with Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace/buy-sell" element={<BuySell />} />
                <Route path="/marketplace/cart" element={<Cart />} />
                <Route path="/marketplace/management" element={<MarketPlacePage />} />
                <Route
                  path="/marketplace/razorpay-payment"
                  element={
                    <RazorpayPaymentFormWrapper
                      onSuccess={() => navigate("/orders/success")}
                    />
                  }
                />
                <Route
                  path="/marketplace/metamask-payment"
                  element={
                    <MetaMaskPaymentWrapperPage />
                  }
                />
                <Route
                  path="/orders/success"
                  element={
                    <OrderSuccess />
                  }
                />
                <Route
                path="/marketplace/my-orders"
                element={
                 <UserPurchasesList/>
                }
              />
              <Route 
              path="/marketplace/pricing-info"
              element={<PricingInfo/>}
              />
              <Route
              path="/marketplace/product/:productId"
              element={<ProductDetailsPage/>}
              />
            <Route path="/category/:slug" element={<CategoryPage/>} />
              <Route
          path="/farmer/logistics/:productId"
          element={
              <FarmerLogistics />
            
          }
        />

              </Routes>
            </Layout>
          } />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
