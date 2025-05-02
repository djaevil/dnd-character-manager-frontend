import { ReactNode } from "react";
import { Navbar, Container } from "react-bootstrap";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100 homepage-bg">
      {/* Navbar */}
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/home">DnD Character Manager</Navbar.Brand>
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
