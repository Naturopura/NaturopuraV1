import { BrowserRouter as Router } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
import "./index.css";
import { NotificationProvider } from './context/NotificationContext';

// Import the new AppRoutes component
import AppRoutes from "./routes/Routes"; // Adjust path if you named it differently or placed it elsewhere

import { Toaster } from "./components/ui/toaster";
import FeedbackButton from './feedback/FeedbackButton';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';


/**
 * Main Application Component
 * This component sets up routing, provides context, and includes global UI elements.
 */
function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <SidebarProvider>
          <Router>
            <CartProvider>
              {/* Render all your routes from the AppRoutes component */}
              <AppRoutes />
            </CartProvider>
          </Router>
          {/* Feedback Button */}
          <FeedbackButton />
          {/* Toaster for notifications */}
          <Toaster />
        </SidebarProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;