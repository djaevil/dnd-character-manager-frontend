import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NotFoundPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="text-center text-light p-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      {currentUser ? (
        <Link to="/home">Go to Home</Link>
      ) : (
        <Link to="/login">Go to Login</Link>
      )}
    </div>
  );
};

export default NotFoundPage;
