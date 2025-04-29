import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function GuestRoute({ children }: { children: React.ReactElement }) {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/home" /> : children;
}

export default GuestRoute;
