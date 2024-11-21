const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission');

// Get all permissions
router.get('/', async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new permission
router.post('/', async (req, res) => {
  const permission = new Permission({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newPermission = await permission.save();
    res.status(201).json(newPermission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a permission
router.delete('/:id', async (req, res) => {
  try {
    await Permission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Permission deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

