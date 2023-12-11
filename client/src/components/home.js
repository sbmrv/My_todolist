import React, { useState, useEffect } from "react";
import "./CSS/Home.css";
import "./CSS/Navbar.css";
import logo from "./images/logo2.png";
import logo2 from "./images/todo.png";
import { useNavigate } from "react-router-dom";
// import videobg1 from "../Assets/video_1.mp4";
// import gsap from "gsap";
import videobg2 from "../Assets/video_2.mp4";

const Home = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  // scroll to top js
  const [showButton, setShowButton] = useState(false);

  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const toggleSidePanel = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* navbar section */}
      <div className="navbar_main">
        <div style={{ display: "flex" }}>
          <div className="todo_title">
            <span className="todo_name" href="/">
              <b className="_name1">My</b>
              <b className="_name2">Todolist</b>
              <img src={logo2} alt="" className="_logo" />
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "200px",
          }}
        >
          <button onClick={handleSignup} className="content_btn">
            Signup
          </button>
          <button onClick={handleLogin} className="content_btn">
            Login
          </button>
          <div className="App">
            <button className="hamburger" onClick={toggleSidePanel}>
              &#9776;
            </button>
            <div className={`side-panel ${sidePanelOpen ? "open" : ""}`}>
              <button onClick={handleSignup}>signup</button>

              <button onClick={handleLogin}>login</button>

              <li className="about_768">
                <a href="/about">about</a>
              </li>
            </div>
          </div>
        </div>
      </div>
      {/* hero section */}
      <div className="hero_section1">
        <div className="hero_text1">
          <h1>
            Welcome to <br />
            <span>Your Organized</span> Life
          </h1>
        </div>
      </div>
      {/* hero section responsive */}
      <div className="hero_768">
        <h1 style={{ lineHeight: "40px", marginBottom: "30px" }}>
          Welcome! <br />
          <h1>to MyTodolist</h1>
        </h1>
      </div>
      {/* scroll to top button  */}
      <h2
        id="scrollToTopButton"
        onClick={scrollToTop}
        style={{ display: showButton ? "block" : "none" }}
      >
        ^
      </h2>
      {/* video auto play >>> */}
      <div className="main_video">
        {/* <div className="video_size">
          <video className="video1" src={videobg1} autoPlay loop muted />
        </div> */}
        <div className="video_size ">
          {/* <div id="video_btn">PLAY</div> */}
          <video className="video2" src={videobg2} autoPlay loop muted />
        </div>
      </div>

      {/* slideshow photo effect >>>>>*/}
      <br />
      <br />
      {/* image1 */}
      <div className="hero_section2 ">
        <div className="hero_img1">
          {/* <div className="overlay"></div> to give the black shade over image */}
          <div className="content_img">
            <h2>
              Personal diary! <i className="bi bi-cursor"></i>
            </h2>
            <button onClick={handleLogin} className="content_btn login_center">
              login
            </button>
            {/* <Link
              to="/login"
              style={{
                textDecoration: "none",
                width: "90px",
              }}
              className="content_btn"
            >
              create
              <i className="bi bi-cursor"></i>
            </Link> */}
            <p>
              Are you ready to take control of your life and boost your
              productivity? Our to-do and diary platform is here to help you
              stay on top of your tasks, set goals, and create a more organized
              and balanced life.
            </p>
          </div>
        </div>
        {/* sidebar text1 */}
        <div className="hero_text1">
          <h1>
            Welcome to <br />
            <span>Your Organized</span> Life
          </h1>
        </div>
        {/* sidebar text1 */}
        <div className="hero_text1">
          <span>
            <button>
              <i className="bi bi-file-lock2-fill-black"></i>
            </button>
            <br />
            <h1>Password protection</h1>
            <p className="hide_768">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              sapiente exercitationem nesciunt est voluptatem consequatur
              dignissimos nobis cumque error illo amet neque quos voluptatum ab
            </p>
          </span>
        </div>
        {/* image2  */}
        <div className="hero_img2">
          <div className="overlay"></div>
          <div className="content_img">
            <h2>
              Login here <i className="bi bi-cursor"></i>
            </h2>
            <button onClick={handleLogin} className="content_btn login_center">
              Login
            </button>
          </div>
        </div>
        {/* image3  */}
        {/* <div className="hero_top hero_top2">
          <div className="overlay">
            <div className="content_img">
              <h1>
                <span style={{ color: "palegreen" }}>Personal notes</span>{" "}
                <span>on Web and Android!</span>
              </h1>
              <h2>
                let's create your personal diary!{" "}
                <i className="bi bi-cursor"></i>
              </h2>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
