require('dotenv').config();
const express = require("express");
require("./conn");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8100;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});