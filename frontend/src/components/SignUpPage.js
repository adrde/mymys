import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "it",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccess("User registered successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          <span style={styles.titleAccent}>🌊</span> Computer Management Sign-Up
        </h2>
        <div style={styles.underline}></div>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
              <option value="admin">Admin</option>
              <option value="it">IT User</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#e0f7fa", // Seafoam
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 14,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    width: 400,
    position: "relative",
  },
  heading: {
    textAlign: "center",
    color: "#01579b",
    fontSize: "1.8rem",
    fontFamily: "'Segoe UI', sans-serif",
    marginBottom: 10,
    fontWeight: 600,
    letterSpacing: "0.5px",
  },
  titleAccent: {
    fontSize: "1.5rem",
    marginRight: 6,
    verticalAlign: "middle",
  },
  underline: {
    width: 50,
    height: 4,
    backgroundColor: "#4dd0e1",
    borderRadius: 4,
    margin: "0 auto 25px auto",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: "600",
    color: "#006064",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #b2ebf2",
    backgroundColor: "#f0fefc",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#0288d1",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: 12,
    transition: "background 0.3s ease",
  },
  error: {
    color: "#d32f2f",
    fontSize: "0.9rem",
    marginBottom: 10,
    textAlign: "center",
  },
  success: {
    color: "#2e7d32",
    fontSize: "0.9rem",
    marginBottom: 10,
    textAlign: "center",
  },
};

export default SignUpPage;
