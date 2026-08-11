import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

/**
 * Guards admin routes. Shows a loading state while the session check (GET /auth/me)
 * is in flight, then redirects to /admin/login if there's no authenticated admin.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkingSession } = useAuth();
  const location = useLocation();

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-parchment">
        <Loader2 className="animate-spin text-forest" size={28} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
