import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, CircularProgress, Alert } from "@mui/material";

const AddComputer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    call_no: "",
    device_name: "",
    ip_address: "",
    os_version: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to add a computer.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/pcs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess("Computer added successfully!");
      setLoading(false);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Error adding computer:", err);
      const msg =
        err.response?.data?.message || "There was an error adding the computer.";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Add a New Computer
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Call No."
              variant="outlined"
              fullWidth
              name="call_no"
              value={formData.call_no}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Device Name"
              variant="outlined"
              fullWidth
              name="device_name"
              value={formData.device_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="IP Address"
              variant="outlined"
              fullWidth
              name="ip_address"
              value={formData.ip_address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="OS Version"
              variant="outlined"
              fullWidth
              name="os_version"
              value={formData.os_version}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Computer"}
        </Button>
      </form>
    </div>
  );
};

export default AddComputer;
