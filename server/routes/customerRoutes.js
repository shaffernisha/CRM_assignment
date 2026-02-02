const express = require("express");
const Customer = require("../models/Customer");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADD CUSTOMER
router.post("/", auth, async (req, res) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      createdBy: req.user,
    });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: "Error adding customer" });
  }
});

// GET CUSTOMERS
router.get("/", auth, async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.user });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers" });
  }
});

// UPDATE CUSTOMER
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating" });
  }
});

// DELETE CUSTOMER
router.delete("/:id", auth, async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
  }
});

module.exports = router;
