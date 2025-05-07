const express = require('express');
const router = express.Router();
const pcController = require('../controllers/pcController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.post('/', protect, pcController.addPc);
router.get('/', protect, pcController.getAllPcs);
router.get('/:id', protect, pcController.getPcById);
router.put('/:id', protect, pcController.updatePc);
router.delete('/:id', protect, pcController.deletePc);

module.exports = router;
