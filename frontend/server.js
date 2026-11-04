const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/classroom_devices')
  .then(() => console.log('Connected to MongoDB Atlas successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Schema & Model cho Thiết bị phòng học
const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'Active' },
  classroom: { type: String, required: true }
}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

// Các Routes API (CRUD)
// 1. Lấy danh sách thiết bị
app.get('/api/devices', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Thêm mới thiết bị
app.post('/api/devices', async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    const savedDevice = await newDevice.save();
    res.status(201).json(savedDevice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Cập nhật thông tin thiết bị
app.put('/api/devices/:id', async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDevice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Xóa thiết bị
app.delete('/api/devices/:id', async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});