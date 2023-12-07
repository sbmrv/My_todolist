import React from "react";
import "./CSS/Navbar.css";
import logo from "./images/logo2.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogin = () => { 
    navigate("/login");
  };
  
  return (
    <>
      <div className="navbar navbarbg center_nav">
        <span>
          <img src={logo} alt="" className="navbarlogosize" />
          <a class="navbar-brand" className="navbarlogoshape" href="/">
            <b className="navbarlogo1">My</b>
            <b className="navbarlogo2">Todo</b>
          </a>
        </span>
        <button onClick={handleSignup} className="content_btn">
          Signup
        </button>
        <button onClick={handleLogin} className="content_btn">
          Login
        </button>
      </div>
    </>
  );
};

export default Navbar;

// previos working navbar >>>

/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <img src={logo} alt="" className="navbarlogosize" />
        <a class="navbar-brand" className="navbarlogoshape">
          <b className="navbarlogo1">my</b>
          <b className="navbarlogo2">Diary</b>
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">
                About
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact">
                Contact
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/signin">
                Signin
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/signup">
                Signup
              </a>
            </li>
          </ul>
        </div>
      </nav> */
