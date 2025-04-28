import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import GuestLayout from "../layouts/GuestLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <AuthLayout>
              <HomePage />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <GuestLayout>
              <LoginPage />
            </GuestLayout>
          }
        />
        <Route
          path="/register"
          element={
            <GuestLayout>
              <RegisterPage />
            </GuestLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
