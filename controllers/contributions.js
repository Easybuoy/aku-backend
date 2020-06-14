const BaseController = require("./base");
const { insertTransaction } = require("../models/transactions");

class Contributions extends BaseController {
  /**
   * Create Association Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/assocations
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
}

module.exports = Contributions;
