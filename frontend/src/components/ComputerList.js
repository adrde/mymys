import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
              <TableCell>Call No</TableCell>
              <TableCell>Register Date</TableCell>
              <TableCell>Device Name</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>MAC Address</TableCell>
              <TableCell>OS Version</TableCell>
              <TableCell>Dept</TableCell>
              <TableCell>Network</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {computers.map((computer) => (
              <TableRow key={computer._id}>
                <TableCell>{computer.callNo}</TableCell>
                <TableCell>
                  {new Date(computer.registerDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{computer.deviceName}</TableCell>
                <TableCell>{computer.ipAddress}</TableCell>
                <TableCell>{computer.macAddress}</TableCell>
                <TableCell>{computer.osVersion}</TableCell>
                <TableCell>{computer.deptName}</TableCell>
                <TableCell>{computer.networkType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ComputerList;
