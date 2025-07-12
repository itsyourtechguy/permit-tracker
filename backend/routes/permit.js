const express = require('express');
const { getPermits, addPermit } = require('../controllers/permit');

const router = express.Router();

// @route   GET /api/permits
router.get('/permits', getPermits);

// @route   POST /api/permits
router.post('/permits', addPermit);

module.exports = router;