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
        <Typography
          variant="h4"
          sx={{
            color: "#1b5e20", // Dark forest text
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Computer Inventory
        </Typography>

        {role === "admin" && (
          <Button
            component={Link}
            to="/add-computer"
            variant="contained"
            sx={{
              backgroundColor: "#2e7d32", // Emerald green
              "&:hover": {
                backgroundColor: "#1b5e20",
              },
              fontWeight: "bold",
              borderRadius: 2,
              px: 3,
              py: 1.2,
            }}
          >
            Add Computer
          </Button>
        )}
      </Box>

      <TableContainer
        component={Paper}
        elevation={5}
        sx={{
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
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
                <TableCell
                  key={col}
                  sx={{
                    fontWeight: "bold",
                    color: "#2e7d32",
                    textTransform: "uppercase",
                  }}
                >
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
                sx={{
                  "&:hover": { backgroundColor: "#f1f8e9" },
                  transition: "background-color 0.3s ease",
                }}
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
