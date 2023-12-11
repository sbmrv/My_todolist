import React, { useState } from "react";
import axios from "axios";
import img1 from "../images/user.jpg";
import { useNavigate } from "react-router-dom";
import {API_URL} from "../api/config"

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [error, setError] = useState("");
  const [paserr, setpaserr] = useState("");
  const navigate = useNavigate();
  
  const handlesignup = async (e) => {
    e.preventDefault();

    try {
      if(password !== cpassword) {
        console.log("Password mismatch");
        setpaserr("password mismatch")
        return;
      }
      const response = await axios.post(API_URL, {
        name,
        password,
        cpassword,
      });
      console.log(response);
      response && navigate("/login");
      // const { dbUser, token } = response.data;
      // Handle successful signup, e.g., set authentication state
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        setError(message);
      } else {
        console.error("Error during signup:", error.message);
        setError("An error occurred during signup");
      }
    }
  };

  return (
    <div className="bgcolor">
      <div className="pgcenter">
        <div className="login_">
          <h1>User Signup</h1>
          <div style={{ color: "red" }}>{error}</div>
          <div style={{ color: "red" }}>{paserr}</div>
          <form onSubmit={handlesignup}>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
            />
            <br />
            <button className="button_login" type="submit">
              signup
            </button>
            <br />
            <a href="/login">signin here</a>
          </form>
        </div>
        <div
          className="img_"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            width: "60vh",
            height: "60vh",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Signup;