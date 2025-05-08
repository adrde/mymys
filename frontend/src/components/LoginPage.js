import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token); // store token
      onLogin(); // callback to refresh app state or redirect
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup"); // Redirect to sign-up page if user doesn't have an account
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: 15 }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: 20 }}>
        <p>
          Don't have an account?{" "}
          <button onClick={handleSignUpRedirect} style={{ color: "blue" }}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


