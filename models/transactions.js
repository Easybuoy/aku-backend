const db = require("../config/db/db");

const insertTransaction = (transactionData) => {
  return db.transaction((trx) => {
    let transactionResponseData = null;
    return db("transaction_history")
      .insert(transactionData)
      .returning("*")
      .transacting(trx)
      .then((data) => {
        transactionResponseData = data;

        return db("accounts").where({ id: transactionData.user_id }).first();
      })
      .then((accoundData) => {
        console.log(accoundData, "accd");
        return db("accounts")
          .where({ id: accoundData.user_id })
          .update({
            total_contributions:
              parseFloat(accoundData.total_contributions) +
              parseFloat(transactionData.amount),
          })
          .returning("*")
          .transacting(trx);
      })
      .then((res) => {
        return {
          transactionData: transactionResponseData[0],
          accountData: res[0],
        };
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
  //   db("transaction_history").insert(transactionData).returning("*");
};

module.exports = {
  insertTransaction,
};
