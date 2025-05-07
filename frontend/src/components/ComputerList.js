import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ComputerList = () => {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return;
    }
  
    axios
      .get("http://localhost:5000/api/pcs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setComputers(response.data))
      .catch((error) => {
        console.error("There was an error fetching the computers!", error);
      });
  }, []);
  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Computer List</h2>
      <Button
        component={Link}
        to="/add-computer"
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Add Computer
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Call No.</TableCell>
              <TableCell>Device Name</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>OS Version</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {computers.map((computer) => (
              <TableRow key={computer._id}>
                <TableCell>{computer.call_no}</TableCell>
                <TableCell>{computer.device_name}</TableCell>
                <TableCell>{computer.ip_address}</TableCell>
                <TableCell>{computer.os_version}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ComputerList;
