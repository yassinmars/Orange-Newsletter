import { useState, useEffect } from "react";
import "boosted/dist/css/boosted.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.removeItem("token");
  }, []);

  const LoginData = {
    Email: Email,
    Password: Password,
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:6005/api/signIn", LoginData)
      .then((res) => {
        console.log("Response received:", res.data);
        const token = res.data.token;
        if (token) {
          navigate("/home");
          localStorage.setItem("token", token);
        } else {
          alert(res.data.msg || "Invalid credentials or login failed.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err.response?.data || err);
        alert(err.response?.data?.msg || "There was an error during login.");
      });
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
                value={Email}
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
                value={Password}
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
            <strong className="me-auto">Notification</strong>
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
