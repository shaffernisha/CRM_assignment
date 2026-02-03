const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://your-app-name.vercel.app"],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));
// Welcome route - Shows success message
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CRM Backend API is running !",
    status: "Server is up and operational",
    endpoints: {
      authentication: "/api/auth",
      customers: "/api/customers"
    },
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
