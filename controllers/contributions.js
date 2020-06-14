const BaseController = require("./base");
const { insertTransaction } = require("../models/transactions");
const { getByUserId } = require("../models/accounts");

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
      };

      const newContribution = await insertTransaction(contributionData);
      console.log(newContribution);
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
      console.log(accountDetails);
      if (accountDetails) {
        return super.success(
          res,
          201,
          `Contribution added successfully`,
          accountDetails
        );
      }
    } catch (error) {
      console.log(error);
      return super.error(res, 500, "Unable to get contributions");
    }
  }
}

module.exports = Contributions;