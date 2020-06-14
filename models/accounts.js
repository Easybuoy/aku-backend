const db = require("../config/db/db");

const createAccount = (accountData) =>
  db("accounts").insert(accountData).returning("*");

const getByUserId = (user_id) => db("accounts").where({ user_id }).first();

const getAccountThatHasNotBeenProcessed = (date) => {
  return db.transaction((trx) => {
    let transactionResponseData = null;
    db("accounts")
      .first()
      .transacting(trx)
      .then((data) => {
        if (!data) {
           throw new Error("No account found");
        }
        transactionResponseData = data;
        console.log(data.user_id);
        return db("interests_log")
          .where({ user_id: data.user_id })
          .andWhere("created_at", ">", date)
          .first();
      })
      .then((res) => {
        console.log(res, date);
        console.log(res);
        if (!res) {
          return {
            message: "Not processed for this week yet",
            status: 0,
            user_id: transactionResponseData.user_id,
          };
        }
        return {
          message: "Interest already added for this week",
          status: 1,
          user_id: transactionResponseData.user_id,
        };
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

module.exports = {
  createAccount,
  getByUserId,
  getAccountThatHasNotBeenProcessed,
};
