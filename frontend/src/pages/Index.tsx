import LoginForm from "../components/LoginForm";
import { useState } from "react";
import "boosted/dist/css/boosted.min.css";


const Index = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setToastMessage("Logged out successfully");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    window.location.reload();
  };

  return (
    <div>
      {/* Header using Boosted/Bootstrap Navbar */}
      <header className="navbar navbar-light bg-white border-bottom sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2000px-Orange_logo.svg.png"
              alt="Orange Logo"
              height="32"
            />
            <span className="ms-2 h5 mb-0">Newsletter Management</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-4">
        <LoginForm />
      </main>

      {/* Boosted/Bootstrap Toast Notification */}
      {showToast && (
        <div
          className="toast-container position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header bg-success text-white">
              <strong className="me-auto">Success</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
