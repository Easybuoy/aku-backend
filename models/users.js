const db = require("../config/db/db");

const insert = (userData) => db("users").insert(userData).returning("*");

const getByUsername = (username) => db("users").where({ username }).first();

const getByEmail = (email) => db("users").where({ email }).first();

const getById = (id) => db("users").where({ id }).first();

const addUserAssociation = (id, changes) =>
  db("users").where({ id }).update(changes);

module.exports = {
  insert,
  getByUsername,
  getByEmail,
  getById,
  addUserAssociation,
};
