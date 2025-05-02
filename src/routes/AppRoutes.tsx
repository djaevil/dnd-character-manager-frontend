import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import GuestLayout from "../layouts/GuestLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <AuthLayout>
                <HomePage />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <GuestLayout>
                <LoginPage />
              </GuestLayout>
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <GuestLayout>
                <RegisterPage />
              </GuestLayout>
            </GuestRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
