import { useState, useEffect } from "react";
import "boosted/dist/css/boosted.min.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); 

  useEffect(() => {
    localStorage.removeItem("isAuthenticated");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@orange.com" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      setToastMessage("Logged in successfully");
      setToastType("success");
      setShowToast(true);
      setTimeout(() => window.location.reload(), 1000);
    } else {
      setToastMessage("Invalid credentials");
      setToastType("danger");
      setShowToast(true);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="card shadow p-4" style={{ width: "350px" }}>
          <div className="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2000px-Orange_logo.svg.png"
              alt="Orange Logo"
              className="mb-3"
              style={{ height: "50px" }}
            />
            <h2 className="h4 fw-bold">Admin Login</h2>
          </div>
          <form onSubmit={handleLogin} className="mt-3">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@orange.com"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn btn-warning w-100">
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* Boosted Toast Notification */}
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{ zIndex: 1050 }}
      >
        <div
          className={`toast fade ${showToast ? "show" : "hide"}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className={`toast-header bg-${toastType} text-white`}>
            
            <strong className="me-auto">
                Notification
              </strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
          <div className="toast-body">{toastMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
