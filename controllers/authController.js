const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const secretKey = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password!' });
    }

    const token = jwt.sign({ username: user.username, role: user.role, level: user.level }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role, level: user.level });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const register = async (req, res) => {
    const { username, password, role, level } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword, role, level });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

module.exports = { login, register };