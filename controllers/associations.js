const BaseController = require("./base");
const { insert } = require("../models/associations");

class Associations extends BaseController {
  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/assocations
   * @description This function implements the logic for creating a new association.
   * @access Public
   */
  async createAssociation(req, res) {
    try {
      const { name } = req.body;

      const associationData = {
        name,
      };

      const newUser = await insert(associationData);

      if (newUser.length > 0) {
        const userResponse = {
          name: newUser[0].name,
          id: newUser[0].id,
        };

        return super.success(
          res,
          201,
          `${name} association created successfully`,
          userResponse
        );
      }
    } catch (error) {
      return super.error(res, 500, "Unable to create association");
    }
  }
}

module.exports = Associations;
