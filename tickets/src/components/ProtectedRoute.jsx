// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("rol");

  if (!isAuthenticated) return <Navigate to="/" />;

  // Si requiredRole es array, revisa si userRole está ahí
  if (requiredRole) {
    if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(userRole)) return <Navigate to="/" />;
    } else {
      if (userRole !== requiredRole) return <Navigate to="/" />;
    }
  }

  return children;
}

export default ProtectedRoute;
