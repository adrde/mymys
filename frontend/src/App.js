import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ComputerList from "./components/ComputerList.js";
import AddComputer from "./components/AddComputer.js";
import LoginPage from "./components/LoginPage.js";
import SignUpPage from "./components/SignUpPage.js";

function App() {
  const handleLoginSuccess = () => {
    window.location.href = "/";
  };

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAuthenticated = !!token;

  const PrivateRoute = ({ children, adminOnly = false }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (adminOnly && role !== "admin") return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Router>
      <div style={styles.appContainer}>
        <header style={styles.header}>
          <h1 style={styles.title}>💻 Computer Management System</h1>
        </header>

        <main style={styles.main}>
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <LoginPage onLogin={handleLoginSuccess} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/signup"
              element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ComputerList />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-computer"
              element={
                <PrivateRoute adminOnly={true}>
                  <AddComputer />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
  },
  header: {
    background: "linear-gradient(to right, #0288d1, #26c6da)", // ocean horizon
    padding: "20px 30px",
    color: "#ffffff",
    textAlign: "center",
    borderBottom: "3px solid #4dd0e1",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  }
  ,
  
  title: {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "600",
    letterSpacing: "0.5px",
    fontFamily: "'Segoe UI', sans-serif",
  }
  ,
  main: {
    padding: "30px 20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
};

export default App;
