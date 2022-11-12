// @ts-nocheck
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Menu = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li className="nav-item">
          <NavLink className="nav-link" end to="/">
            HOME
          </NavLink>
        </li>
        {auth?.user === null ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <li className="nav-item pointer">
            <a href="/" onClick={logout} className="nav-link">
              Logout
            </a>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
