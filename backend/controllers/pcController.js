const Pc = require('../models/Pc');

// Add a new PC
exports.addPc = async (req, res) => {
  try {
    const newPc = new Pc(req.body);
    await newPc.save();
    res.status(201).json({ message: 'PC added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add PC' });
  }
};

// Get all PCs
exports.getAllPcs = async (req, res) => {
  try {
    const pcs = await Pc.find();
    res.json(pcs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch PCs' });
  }
};

// Get PC by ID
exports.getPcById = async (req, res) => {
  try {
    const pc = await Pc.findById(req.params.id);
    if (!pc) return res.status(404).json({ message: 'PC not found' });
    res.json(pc);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching PC' });
  }
};

// Update PC
exports.updatePc = async (req, res) => {
  try {
    const pc = await Pc.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pc) return res.status(404).json({ message: 'PC not found' });
    res.json({ message: 'PC updated successfully', pc });
  } catch (err) {
    res.status(500).json({ message: 'Error updating PC' });
  }
};

// Delete PC
exports.deletePc = async (req, res) => {
  try {
    const pc = await Pc.findByIdAndDelete(req.params.id);
    if (!pc) return res.status(404).json({ message: 'PC not found' });
    res.json({ message: 'PC deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting PC' });
  }
};
