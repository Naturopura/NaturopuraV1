import { Navigate, useLocation, useNavigate, Location } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode | ((props: { location: Location; navigate: (to: string) => void }) => React.ReactNode);
  allowedRoles: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  if (typeof children === 'function') {
    return children({ location, navigate });
  }

  return children;
};

export default PrivateRoute;
