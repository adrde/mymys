const mongoose = require('mongoose');

const pcSchema = new mongoose.Schema({
  callNo: { type: String, required: true, unique: true },
  registerDate: { type: Date, required: true },
  networkType: {
    type: String,
    enum: ['DRONA', 'CIAG', 'STANDALONE', 'NKN'],
    required: true
  },
  deptName: { type: String, required: true },
  userInfo: { type: String, required: true },
  deviceName: { type: String, required: true },
  macAddress: { type: String, required: true },
  ipAddress: { type: String, required: true },
  osVersion: { type: String, required: true },
  cpuSerialNo: { type: String, required: true },
  pcModel: { type: String, required: true },
  pcSerialNo: { type: String, required: true },
  antivirusStatus: { type: String, required: true },
  firewallEnabled: { type: Boolean, required: true },
  wsusImplemented: { type: Boolean, required: true },
  ntpStatus: { type: Boolean, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Pc', pcSchema);
