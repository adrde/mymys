import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome Back</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <div style={styles.redirect}>
          <p>
            Don't have an account?{" "}
            <span style={styles.link} onClick={handleSignUpRedirect}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#e6f9f4", // soft mint background
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 35,
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: 400,
  },
  heading: {
    marginBottom: 25,
    color: "#2d3748", // deep slate
    textAlign: "center",
    fontSize: "1.8rem",
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: "500",
    color: "#2d3748",
  },
  input: {
    width: "100%",
    padding: 10,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: "1rem",
    backgroundColor: "#f9fafa",
    color: "#2d3748",
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#38b2ac", // mint teal
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 10,
    transition: "background-color 0.3s ease",
  },
  redirect: {
    marginTop: 20,
    textAlign: "center",
    fontSize: "0.95rem",
  },
  link: {
    color: "#38b2ac",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "bold",
  },
  error: {
    color: "#e53e3e", // coral red
    fontSize: "0.9rem",
    marginBottom: 15,
    textAlign: "center",
  },
};

export default LoginPage;
