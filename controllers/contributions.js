const BaseController = require("./base");
const {
  insertTransaction,
  weeklyInterests,
} = require("../models/transactions");
const {
  getByUserId,
  getAccountThatHasNotBeenProcessed,
} = require("../models/accounts");

const { oneWeekAgoDate } = require("../utils");
class Contributions extends BaseController {
  /**
   * Create Association Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/contributions/calculate
   * @description This function implements the logic for creating a new association.
   * @access Public
   */
  async contribute(req, res) {
    try {
      const { amount } = req.body;

      const contributionData = {
        amount,
        user_id: req.user_id,
        type: "contribution",
      };

      const newContribution = await insertTransaction(contributionData);
      if (newContribution) {
        const contributionResponse = {
          totalContributions: newContribution.accountData.total_contributions,
        };

        return super.success(
          res,
          201,
          `Contribution added successfully`,
          contributionResponse
        );
      }
    } catch (error) {
      return super.error(res, 500, "Unable to create association");
    }
  }

  /**
   * Create Association Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route GET api/v1/contributions
   * @description This function implements the logic geting a drivers contributions.
   * @access Public
   */
  async getContributions(req, res) {
    try {
      const { user_id } = req;
      const accountDetails = await getByUserId(user_id);
      if (accountDetails) {
        const responseData = {
          total_contributions: accountDetails.total_contributions,
        };
        return super.success(
          res,
          200,
          `Contributions gotten successfully`,
          responseData
        );
      }
    } catch (error) {
      return super.error(res, 500, "Unable to get contributions");
    }
  }

  /**
   * Adds weekly interests Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route GET api/v1/contributions/addinterest
   * @description This function implements the logic for adding weekly interests.
   * @access Public
   */
  async addInterests(req, res) {
    try {
      const oneweekago = oneWeekAgoDate();

      const account = await getAccountThatHasNotBeenProcessed(oneweekago);
      if (account.status === 1) {
        return super.error(
          res,
          400,
          "Interest already added for user this week"
        );
      }

      const addWeeklyInterests = await weeklyInterests(account.user_id);
      console.log(addWeeklyInterests, "a");
      if (addWeeklyInterests) {
        const responseData = {
          total_contributions:
            addWeeklyInterests.accountData.total_contributions,
          interest_added: addWeeklyInterests.interest_added,
        };
        return super.success(
          res,
          200,
          `Interest added successfully for user ${addWeeklyInterests.accountData.user_id}`,
          responseData
        );
      }
    } catch (error) {
      console.log(error);
      return super.error(res, 500, "Unable to get contributions");
    }
  }
}

module.exports = Contributions;
