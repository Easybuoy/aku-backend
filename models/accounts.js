const db = require("../config/db/db");

const createAccount = (accountData) =>
  db("accounts").insert(accountData).returning("*");

const getByUserId = (user_id) => db("accounts").where({ user_id }).first();

module.exports = {
  createAccount,
  getByUserId,
};
