const BaseController = require("./base");
const { insert, getByEmail } = require("../models/users");
const { hashPassword, verifyPassword, generateToken } = require("../utils");
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
      const { email, password } = req.body;

      const existingUser = await getByEmail(email);

      if (existingUser) {
        const isValidPassword = verifyPassword(password, existingUser.password);
        if (isValidPassword === true) {
          const payload = {
            id: existingUser.id,
          };
          const token = generateToken(payload);

          const data = {
            token,
          };
          return super.success(res, 200, "Driver login successful", data);
        }
        return super.error(res, 401, "Invalid Password");
      }
      return super.error(res, 404, "Driver not found");
    } catch (error) {
      console.log(error);
      return super.error(res, 500, "Unable to login driver");
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
          username: newUser[0].username,
          email: newUser[0].email,
          type: newUser[0].type,
          phone: newUser[0].phone,
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

module.exports = Drivers;
