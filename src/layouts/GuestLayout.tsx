import { ReactNode } from "react";

interface GuestLayoutProps {
  children: ReactNode;
}

function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <>
      <div className="d-flex flex-column justify-content-between vh-100 vw-100 overflow-hidden guest-bg">
        <header className="row align-items-start text-center text-light bg-dark py-2">
          <h3 className="display-6">DnD Character Manager</h3>
        </header>
        <div className="row align-items-center justify-content-center">
          <div
            className="w-100 rounded-3 bg-dark p-3 shadow-lg"
            style={{ maxWidth: "450px" }}
          >
            {children}
          </div>
        </div>
        <footer className="row align-items-end text-center text-light bg-dark"></footer>
      </div>
    </>
  );
}

export default GuestLayout;
