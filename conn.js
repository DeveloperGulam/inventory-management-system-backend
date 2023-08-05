require("dotenv").config();
const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.DB_CONN)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });;

module.exports = connection;