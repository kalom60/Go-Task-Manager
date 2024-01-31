import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const location = useLocation();
  const auth = useAuth();

  return !auth.isLoggedIn ? (
    <Navigate to="/signin" state={{ from: location }} replace />
  ) : (
    children
  );
};
