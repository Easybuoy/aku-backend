const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const hashPassword = (password) => bcrypt.hashSync(password, 12);

const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

const calculateInterest = (amount) => {
  const { INTEREST_RATE } = process.env;

  return (amount * parseFloat(INTEREST_RATE)) / 100;
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  calculateInterest,
};
