import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Collapse,
} from "@mui/material";

const AddComputer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    callNo: "",
    registerDate: "",
    networkType: "",
    deptName: "",
    userInfo: "",
    deviceName: "",
    macAddress: "",
    ipAddress: "",
    osVersion: "",
    cpuSerialNo: "",
    pcModel: "",
    pcSerialNo: "",
    antivirusStatus: "",
    firewallEnabled: false,
    wsusImplemented: false,
    ntpStatus: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthorized(false);
      setError("Unauthorized. Please login as an admin.");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.role !== "admin") {
      setIsAuthorized(false);
      setError("Access denied. Only admins can add a computer.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/pcs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Computer added successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const msg =
        err.response?.data?.message || "There was an error adding the computer.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card elevation={5}>
        <CardContent>
          <Typography variant="h4" gutterBottom color="primary" align="center">
            Add a New PC
          </Typography>

          <Collapse in={!!success}>
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          </Collapse>
          <Collapse in={!!error}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                { name: "callNo", label: "Call No" },
                { name: "registerDate", label: "Register Date", type: "date" },
                { name: "deptName", label: "Department Name" },
                { name: "userInfo", label: "User Info" },
                { name: "deviceName", label: "Device Name" },
                { name: "macAddress", label: "MAC Address" },
                { name: "ipAddress", label: "IP Address" },
                { name: "osVersion", label: "OS Version" },
                { name: "cpuSerialNo", label: "CPU Serial No" },
                { name: "pcModel", label: "PC Model" },
                { name: "pcSerialNo", label: "PC Serial No" },
                { name: "antivirusStatus", label: "Antivirus Status" },
              ].map(({ name, label, type }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <TextField
                    fullWidth
                    label={label}
                    name={name}
                    type={type || "text"}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              ))}

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Network Type"
                  name="networkType"
                  value={formData.networkType}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  {["DRONA", "CIAG", "STANDALONE", "NKN"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {[
                { name: "firewallEnabled", label: "Firewall Enabled" },
                { name: "wsusImplemented", label: "WSUS Implemented" },
                { name: "ntpStatus", label: "NTP Status" },
              ].map(({ name, label }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData[name]}
                        onChange={handleChange}
                        name={name}
                      />
                    }
                    label={label}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Add PC"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddComputer;
