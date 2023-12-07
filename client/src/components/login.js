import React, { useState, useEffect } from "react";
import axios from "axios";
import img1 from "../images/user.jpg";
import { API_URL } from "../api/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        name,
        password,
      });
      console.log(response);
      console.log(response.data.token);
      localStorage.setItem("jwt", response.data.token);
      if (response.status === 200) {
        navigate("/todo");
      } 
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        setError(message);
      } else {
        console.error("Error during login:", error.message);
        setError("An error occurred during login");
      }
    }
  };

  return (
    <>
      <div className="bgcolor">
        <div className="pgcenter">
          <div
            className="img_"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundSize: "cover",
              width: "60vh",
              height: "60vh",
            }}
          ></div>
          <div className="login_">
            <h1>User Login</h1>
            <div style={{ color: "red" }}>{error}</div>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="User Id"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button className="button_login" type="submit">
                Login
              </button>
              <br />
              <a href="/signup">Don't have account, signup here</a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
