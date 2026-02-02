const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  company: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Customer", customerSchema);
