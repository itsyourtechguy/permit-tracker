const Permit = require('../models/Permit');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Get all permits for logged-in user
// @route   GET /api/permits
exports.getPermits = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const permits = await Permit.find({ user: user._id }).sort({ deadline: 1 });

    res.json(permits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add new permit
// @route   POST /api/permits
exports.addPermit = async (req, res) => {
  const { country, permitType, deadline } = req.body;

  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const permit = await Permit.create({
      user: user._id,
      country,
      permitType,
      deadline,
    });

    res.status(201).json(permit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};