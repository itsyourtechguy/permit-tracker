const express = require('express');
const { getPermits, addPermit, deletePermit, updatePermit } = require('../controllers/permit');

const router = express.Router();

// @route   GET /api/permits
router.get('/permits', getPermits);

// @route   POST /api/permits
router.post('/permits', addPermit);

// @route DELETE /api/permits/:id
router.delete('/permits/:id', deletePermit);

// @route UPDATE /api/permits/:id
router.put('/permits/:id', updatePermit);

module.exports = router;