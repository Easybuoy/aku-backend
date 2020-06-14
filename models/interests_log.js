const db = require("../config/db/db");

const getUserInterestsForThePastOneWeek = (date) =>
  db("interests_log").andWhere("created_at", "<", date).first();

module.exports = {
  getUserInterestsForThePastOneWeek,
};
