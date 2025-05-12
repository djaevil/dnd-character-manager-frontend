import { ReactNode } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      theme: "dark",
      showCancelButton: true,
      cancelButtonColor: "#dc3545",
      confirmButtonColor: "#ffc107",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 page-bg">
      {/* Navbar */}
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/home">DnD Character Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <NavDropdown title="More" id="nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="container flex-grow-1 mt-4 mb-5">{children}</main>

      {/* Footer */}
      <footer className="bg-dark text-center py-3 mt-auto">
        <div className="container">
          <small className="text-light">
            © {new Date().getFullYear()} DnD Character Manager · All rights
            reserved.
          </small>
        </div>
      </footer>
    </div>
  );
}

export default AuthLayout;
