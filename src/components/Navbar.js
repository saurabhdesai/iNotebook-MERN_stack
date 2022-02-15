import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Navbar(props) {
  const [mode, setmode] = useState("light");

  const togglemode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "#042743";
      document.body.style.color = "white";
      props.showAlert("Dark mode enabled", "success");
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      props.showAlert("Light mode enabled", "success");
    }
  };

  let location = useLocation();
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    props.showAlert("Logout Successful", "success");
    history.push("/login");
  };
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/" ? "active" : " "
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/about" ? "active" : " "
                  }`}
                  to="about"
                >
                  About us
                </Link>
              </li> */}
            </ul>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onClick={togglemode}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Enable Dark Mode
              </label>
            </div>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link className="btn btn-primary mx-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary mx-2" to="/signup">
                  Regsiter
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary mx-2" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
