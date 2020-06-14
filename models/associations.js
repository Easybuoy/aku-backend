const db = require("../config/db/db");

const insertAssociation = (userData) =>
  db("associations").insert(userData).returning("*");

const getById = (id) => db("associations").where({ id }).first();

module.exports = {
  insertAssociation,
  getById,
};
