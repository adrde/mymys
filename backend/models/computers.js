const mongoose = require('mongoose');

const ComputerSchema = new mongoose.Schema({
  call_no: String,
  device_name: String,
  ip_address: String,
  os_version: String,
});

const Computer = mongoose.model('Computer', ComputerSchema);

module.exports = Computer;
