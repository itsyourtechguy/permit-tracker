const Permit = require("../models/Permit");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// @desc    Get all permits for logged-in user
// @route   GET /api/permits
exports.getPermits = async (req, res) => {
  try {
    const permits = await Permit.find({ user: req.user._id }).sort({ deadline: 1 });

    res.json(permits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add new permit
// @route   POST /api/permits
exports.addPermit = async (req, res) => {
  const { country, permitType, deadline } = req.body;

  try {
    const permit = await Permit.create({
      user: req.user._id,
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

// @desc    Delete a permit
// @route   DELETE /api/permits/:id
exports.deletePermit = async (req, res) => {
  try {
    const permitId = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(permitId)) {
      return res.status(400).json({ message: 'Invalid permit ID' });
    }

    const permit = await Permit.findById(permitId);

    if (!permit) {
      return res.status(404).json({ message: 'Permit not found' });
    }

    // Make sure logged-in user owns the permit
    if (permit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Delete permit from DB
    await Permit.findByIdAndDelete(permitId);

    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting permit:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a permit
// @route   PUT /api/permits/:id
exports.updatePermit = async (req, res) => {
  try {
    const permitId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(permitId)) {
      return res.status(400).json({ message: 'Invalid permit ID' });
    }

    const permit = await Permit.findById(permitId);

    if (!permit) {
      return res.status(404).json({ message: 'Permit not found' });
    }

    // Check ownership
    if (permit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update permit with new data
    const updatedPermit = await Permit.findByIdAndUpdate(permitId, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedPermit);
  } catch (err) {
    console.error('Error updating permit:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
