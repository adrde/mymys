import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ComputerList from "./components/ComputerList.js";
import AddComputer from "./components/AddComputer.js";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Computer Management System</h1>
        <Routes>
          <Route path="/" element={<ComputerList />} />
          <Route path="/add-computer" element={<AddComputer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
