const db = require("../config/db/db");

const insertTransaction = (transactionData) =>
  db("transaction_history").insert(transactionData).returning("*");

module.exports = {
  insertTransaction,
};
