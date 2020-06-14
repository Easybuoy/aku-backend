const BaseController = require("./base");
const { insert, getByEmail } = require("../models/users");

class Associations extends BaseController {
  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/drivers/register
   * @description This function implements the logic for registering a new driver.
   * @access Public
   */
  async createAssociation(req, res) {
    try {
      const { email, password, name } = req.body;

      const hashedPassword = hashPassword(password);
      const userData = {
        email,
        name,
        password: hashedPassword,
      };

      const newUser = await insert(userData);

      if (newUser.length > 0) {
        const userResponse = {
          email: newUser[0].email,
          name: newUser[0].name,
          id: newUser[0].id,
        };

        return super.success(
          res,
          201,
          "Driver registered successfully",
          userResponse
        );
      }
    } catch (error) {
      return super.error(res, 500, "Unable to register driver");
    }
  }
}

module.exports = Associations;
