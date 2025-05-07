// routes/restaurant.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// POST - Create new restaurant
router.post('/posts', async (req, res) => {
  try {
    const newEntry = new Restaurant(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Get all restaurants
router.get('/posts', async (req, res) => {
  try {
    const data = await Restaurant.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update restaurant by ID
router.put('/posts/:id', async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Restaurant not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Delete restaurant by ID
router.delete('/posts/:id', async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Restaurant not found" });
    res.json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
