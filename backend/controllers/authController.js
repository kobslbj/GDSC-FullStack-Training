const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, password_hash: hashedPassword });
  res.json(user);
};

exports.login = async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ where: { name } });
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
};
