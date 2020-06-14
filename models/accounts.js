const db = require("../config/db/db");

const createAccount = (accountData) =>
  db("accounts").insert(accountData).returning("*");

module.exports = {
  createAccount,
};
