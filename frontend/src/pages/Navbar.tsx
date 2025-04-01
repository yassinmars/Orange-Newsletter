import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      data-bs-theme="dark"
      style={{ backgroundColor: "#000"}}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/home" style={{ color: "#ff7f32" }}>
          <img
            src="https://univ-internationale.com/sites/default/files/orange-tunisie.png"
            alt="Orange Logo"
            style={{ height: "70px" }}
          />
        </a>

        <ul className="navbar-nav d-flex w-100">
          <li className="nav-item">
            <NavLink
              to="/home"
              className="nav-link text-white"
              activeClassName="active-link"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/news"
              className="nav-link text-white"
              activeClassName="active-link"
            >
              News
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/templates"
              className="nav-link text-white"
              activeClassName="active-link"
            >
              Templates
            </NavLink>
          </li>

          {/* Log out button on the far right */}
          <li className="ms-auto">
            <button
              className="btn btn-primary logout-btn"
              onClick={handleLogout}
            >
              Log out
            </button>
          </li>
        </ul>
      </div>

      <style>
        {`
          .navbar-nav .nav-link:hover {
            color: #ff7f32 !important;
          }
          .navbar-nav .nav-link.active-link {
            color: #ff7f32 !important;
            text-decoration: none;
            position: relative;
          }
          .navbar-nav .nav-link.active-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: #ff7f32;
            border-radius: 2px;
          }
          .logout-btn {
            background-color: white;
            color: black;
            border: none;
            padding: 10px 20px;
            font-weight: bold;
            border-radius: 5px;
            transition: all 0.3s ease;
          }
          .logout-btn:hover {
            background-color: #ff7f32;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0px 4px 10px rgba(255, 127, 50, 0.5);
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
