const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getPermits,
  addPermit,
  deletePermit,
  updatePermit,
} = require('../controllers/permit');

const router = express.Router();

// All permit routes are protected
router.route('/permits').get(protect, getPermits).post(protect, addPermit);

router
  .route('/permits/:id')
  .put(protect, updatePermit)
  .delete(protect, deletePermit);

module.exports = router;