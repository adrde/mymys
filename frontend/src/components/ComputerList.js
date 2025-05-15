import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const ComputerList = () => {
  const [computers, setComputers] = useState([]);
  const role = localStorage.getItem("role");
;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return;
    }

    axios
      .get("http://localhost:5000/api/pcs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setComputers(res.data))
      .catch((err) => {
        console.error("Error fetching computers:", err);
      });
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" color="primary">
          Computer Inventory
        </Typography>
        {role === "admin" && (
  <Button
    component={Link}
    to="/add-computer"
    variant="contained"
    color="primary"
  >
    Add Computer
  </Button>
)}

      </Box>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f4f8" }}>
            <TableRow>
              {[
                "Call No",
                "Register Date",
                "Device Name",
                "IP Address",
                "MAC Address",
                "OS Version",
                "Dept",
                "Network",
              ].map((col) => (
                <TableCell key={col} sx={{ fontWeight: "bold" }}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {computers.map((computer) => (
              <TableRow
                key={computer._id}
                hover
                sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
              >
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
    </Container>
  );
};

export default ComputerList;
