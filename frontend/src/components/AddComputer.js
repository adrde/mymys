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

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    axios
      .post("http://localhost:5000/api/pcs", formData)
      .then(() => {
        setLoading(false); // Set loading to false when submission is successful
        setSuccess("Computer added successfully!"); // Show success message
        setError(""); // Clear any previous error messages
        setTimeout(() => {
          navigate("/"); // Redirect to computer list page after success
        }, 1500); // Wait for 1.5 seconds before navigating
      })
      .catch((error) => {
        setLoading(false); // Set loading to false if there's an error
        setError("There was an error adding the computer!"); // Show error message
        setSuccess(""); // Clear any previous success messages
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Add a New Computer
      </Typography>
      
      {/* Show success or error message */}
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

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
        
        {/* Show loading spinner if submitting */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          disabled={loading} // Disable the button while loading
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Computer"}
        </Button>
      </form>
    </div>
  );
};

export default AddComputer;
