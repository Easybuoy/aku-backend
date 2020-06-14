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

  return (parseFloat(amount) * parseFloat(INTEREST_RATE)) / 100;
};

const oneWeekAgoDate = () => {
  let days = 7;
  let date = new Date();
  let last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  let day = last.getDate();
  let month = last.getMonth() + 1;
  if (day < 10) {
    day = `0${day}`;
  }

  let year = last.getFullYear();
  return `${year}-0${month}-${day}`;
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  calculateInterest,
  oneWeekAgoDate,
};
