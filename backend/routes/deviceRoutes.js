const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// GET all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new device
router.post('/', async (req, res) => {
  const { name, type, status, classroom } = req.body;
  const newDevice = new Device({ name, type, status, classroom });
  try {
    const savedDevice = await newDevice.save();
    res.status(201).json(savedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update device
router.put('/:id', async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE device
router.delete('/:id', async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.json({ message: 'Device deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;