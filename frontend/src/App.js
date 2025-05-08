import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ComputerList from "./components/ComputerList.js";
import AddComputer from "./components/AddComputer.js";
import LoginPage from "./components/LoginPage.js";
import SignUpPage from "./components/SignUpPage.js"; // Import SignUpPage

function App() {
  const handleLoginSuccess = () => {
    window.location.href = "/"; // Redirect to home after successful login
  };

  // Check if user is logged in by verifying token presence
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <div className="App">
        <h1>Computer Management System</h1>
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <LoginPage onLogin={handleLoginSuccess} /> : <Navigate to="/" />}
          />
          <Route path="/signup" element={<SignUpPage />} /> {/* Route for signup */}
          <Route
            path="/"
            element={
              isAuthenticated ? <ComputerList /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/add-computer"
            element={
              isAuthenticated ? <AddComputer /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
