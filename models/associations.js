const db = require("../config/db/db");

const insert = (userData) => db("associations").insert(userData).returning("*");

const getById = (id) => db("associations").where({ id }).first();

module.exports = {
  insert,
  getById,
};
