const Login = require('../models/Login');

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await Login.findOne({ f_userName: username });

  if (!user || user.f_Pwd !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful' });
};

module.exports = { loginUser };
