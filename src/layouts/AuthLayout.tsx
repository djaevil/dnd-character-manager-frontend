import { ReactNode } from "react";
import { Navbar, Container } from "react-bootstrap";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">DnD Character Manager</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="container mt-4">{children}</main>

      {/* Footer (optional) */}
      <footer className="text-center py-4">
        <small>© 2025 DnD Character Manager</small>
      </footer>
    </>
  );
}

export default AuthLayout;
