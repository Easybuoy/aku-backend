const db = require("../config/db/db");

const insert = async (userData) => {
  return db.transaction((trx) => {
    let userResponseData = null;
    return db("users")
      .insert(userData)
      .returning("*")
      .transacting(trx)
      .then((data) => {
        userResponseData = data;

        return db("accounts")
          .insert({ user_id: data[0].id, total_contributions: 0 })
          .returning("*")
          .transacting(trx);
      })
      .then((res) => {
        console.log(res);
        return { userData: userResponseData[0], accountData: res[0] };
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

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
