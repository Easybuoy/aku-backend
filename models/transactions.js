const db = require("../config/db/db");
const { calculateInterest } = require("../utils");
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
};

const weeklyInterests = (user_id) => {
  return db.transaction((trx) => {
    let transactionResponseData = null;
    let currentAccountData = null;
    let interest_added = null;
    return db("accounts")
      .where({ id: user_id })
      .first()
      .transacting(trx)
      .then((response) => {
        currentAccountData = response;
        const interest = calculateInterest(response.total_contributions);
        interest_added = interest;
        const transactionData = {
          amount: interest,
          user_id,
          type: 'interest'
        };
        return db("transaction_history")
          .insert(transactionData)
          .returning("*")
          .transacting(trx)
          .then((data) => {
            transactionResponseData = data;

            return db("accounts")
              .where({ user_id })
              .update({
                total_contributions:
                  parseFloat(currentAccountData.total_contributions) +
                  parseFloat(data[0].amount),
              })
              .returning("*");
          });
      })
      .then((res) => {
        return {
          transactionData: transactionResponseData[0],
          accountData: res[0],
          interest_added,
        };
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

module.exports = {
  insertTransaction,
  weeklyInterests,
};
