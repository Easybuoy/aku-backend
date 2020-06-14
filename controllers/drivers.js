const BaseController = require("./base");

const { insert } = require("../models/drivers");
class Drivers extends BaseController {
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

  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/auth/register
   * @description This function implements the logic for registering a new user.
   * @access Public
   */
  async register(req, res) {
    try {
      const { username, email, password, name, phone } = req.body;

      const hashedPassword = hashPassword(password);
      const userData = {
        username,
        email,
        type,
        name,
        phone,
        password: hashedPassword,
      };

      const newUser = await insert(userData);

      if (newUser.length > 0) {
        const userResponse = {
          username: newUser[0].username,
          email: newUser[0].email,
          type: newUser[0].type,
          phone: newUser[0].phone,
          name: newUser[0].name,
          id: newUser[0].id,
        };

        if (phone) {
          const message = `Hello ${name}, thank you for registering on replate platform, it's great to have you.`;
          sendMessage(phone, message);
        }

        return super.success(
          res,
          201,
          "User registered successfully",
          userResponse
        );
      }
    } catch (error) {
      return super.error(res, 500, "Unable to register user");
    }
  }
}

module.exports = Drivers;
