import { Home, List, CheckCircle, Clock } from "react-feather";
import { NavLink } from "react-router-dom";
import "../Custom-CSS.css";

const Navbar = () => {
  return (
    <div className="box ml-6 mr-6">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand mr-5">
          <a className="navbar-item" href="#">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink className="navbar-item is-active" to="/">
              <Home size={18} style={{ marginRight: "10px" }} />{" "}
              <p>All Todos</p>
            </NavLink>

            <NavLink className="navbar-item is-active" to="/important">
              <List size={18} style={{ marginRight: "10px" }} />
              <p>Important!</p>
            </NavLink>

            <NavLink className="navbar-item is-active" to="/completed">
              <CheckCircle size={18} style={{ marginRight: "10px" }} />
              <p>Completed</p>
            </NavLink>

            <NavLink className="navbar-item is-active" to="/now">
              <Clock size={18} style={{ marginRight: "10px" }} />
              <p>Do It Now</p>
            </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
