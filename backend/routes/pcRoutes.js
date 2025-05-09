const express = require('express');
const router = express.Router();
const pcController = require('../controllers/pcController');
const { protect, adminOnly } = require('../middleware/auth');

// Only authenticated users can view
router.get('/', protect, pcController.getAllPcs);
router.get('/:id', protect, pcController.getPcById);

// Only admins can create, update, delete
router.post('/', protect, adminOnly, pcController.addPc);
router.put('/:id', protect, adminOnly, pcController.updatePc);
router.delete('/:id', protect, adminOnly, pcController.deletePc);

module.exports = router;
