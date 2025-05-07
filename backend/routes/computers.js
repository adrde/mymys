const express = require('express');
const router = express.Router();
const Computer = require('../models/Computer');

// Get all computers
router.get('/computers', async (req, res) => {
  try {
    const computers = await Computer.find();
    res.json(computers);
  } catch (error) {
    res.status(500).send("Error fetching computers");
  }
});

// Add a new computer
router.post('/computers', async (req, res) => {
  const { call_no, device_name, ip_address, os_version } = req.body;

  const newComputer = new Computer({
    call_no,
    device_name,
    ip_address,
    os_version,
  });

  try {
    await newComputer.save();
    res.status(201).send("Computer added");
  } catch (error) {
    res.status(500).send("Error adding computer");
  }
});

module.exports = router;
