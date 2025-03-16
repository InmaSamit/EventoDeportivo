const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const data = user;
  return jwt.sign(data, process.env.JWT_API_SECRET, { expiresIn: '1h' });
};
module.exports = { createToken };
