import { Home, List, CheckCircle, MinusCircle, Calendar } from "react-feather";
import { NavLink, useNavigate } from "react-router-dom";
import TaskLogo from "../../assets/booking-reservation-icon.png";
import "../Custom-CSS.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isNavbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!isNavbarActive);
  };

  const handleLogout = async () => {
    try {
      auth.logout();
      navigate("/signin");
    } catch (err) {
      navigate("/signin");
    }
  };

  return (
    <div className="box bx-container">
      {/* use this className to make overlay
      {`navbar-container${isNavbarActive ? " is-active" : ""}`} */}
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand mr-5">
          <a className="navbar-item" href="/">
            <img src={TaskLogo} alt="Task Logo" />
          </a>

          <a
            role="button"
            className={`navbar-burger${isNavbarActive ? " is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={toggleNavbar}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu${isNavbarActive ? " is-active" : ""}`}
        >
          <div className="navbar-start">
            <NavLink
              className={`navbar-item${!isNavbarActive ? " is-active" : ""}`}
              to="/"
            >
              <Home size={18} style={{ marginRight: "10px" }} /> All Todos
            </NavLink>

            <NavLink
              className={`navbar-item${!isNavbarActive ? " is-active" : ""}`}
              to="/important"
            >
              <List size={18} style={{ marginRight: "10px" }} /> Important!
            </NavLink>

            <NavLink
              className={`navbar-item${!isNavbarActive ? " is-active" : ""}`}
              to="/completed"
            >
              <CheckCircle size={18} style={{ marginRight: "10px" }} />{" "}
              Completed
            </NavLink>

            <NavLink
              className={`navbar-item${!isNavbarActive ? " is-active" : ""}`}
              to="/waiting"
            >
              <MinusCircle size={18} style={{ marginRight: "10px" }} /> Waiting
            </NavLink>

            <NavLink
              className={`navbar-item${!isNavbarActive ? " is-active" : ""}`}
              to="/today"
            >
              <Calendar size={18} style={{ marginRight: "10px" }} /> Today
            </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/*
                <a className="button is-primary">
                  <strong>Log out</strong>
                </a>
                */}
                <a className="button is-light" onClick={handleLogout}>
                  Log out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
