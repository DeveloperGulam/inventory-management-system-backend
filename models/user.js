const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Manager', 'Assistant'],
    default: 'Assistant',
  },
  level: {
    type: Number,
    required: true,
    default: 1, // 1 for manager, 2 for Assistant
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;