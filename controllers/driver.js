const BaseController = require("./base");

class Driver extends BaseController {
  /**
   * Login Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/auth/login
   * @description This function implements the logic for logging in a new user.
   * @access Public
   */
  async login(req, res) {
    try {
      console.log(req.body);

      return super.error(res, 401, "Invalid Password");
    } catch (error) {
      return super.error(res, 500, "Unable to login user");
    }
  }
}

module.exports = Driver;
