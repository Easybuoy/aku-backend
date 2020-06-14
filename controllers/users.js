const BaseController = require("./base");
const { insert, getByEmail, addUserAssociation } = require("../models/users");
const { getAssociationById } = require("../models/associations");
const { createAccount } = require("../models/accounts");
const { hashPassword, verifyPassword, generateToken } = require("../utils");
class Drivers extends BaseController {
  /**
   * Login Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/drivers/login
   * @description This function implements the logic for logging in a driver.
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
   * @route POST api/v1/drivers/register
   * @description This function implements the logic for registering a new driver.
   * @access Public
   */
  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      const existingUser = await getByEmail(email);

      if (existingUser) {
        return super.error(res, 400, "Email already exists");
      }

      const hashedPassword = hashPassword(password);
      const userData = {
        email,
        name,
        password: hashedPassword,
      };

      const newUser = await insert(userData);
      console.log(newUser, "newuser");
      if (newUser) {
        const userResponse = {
          userId: newUser.userData.id,
          name: newUser.userData.name,
          email: newUser.userData.email,
          accoundId: newUser.accountData.id,
        };
        return super.success(
          res,
          201,
          "Driver registered successfully",
          userResponse
        );
      }
      throw new Error("Unable to register driver");
    } catch (error) {
      console.log(error);
      return super.error(res, 500, "Unable to register driver");
    }
  }

  /**
   * Assign Association Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/v1/drivers/assignassociation
   * @description This function implements the logic for assigning a driver to an association.
   * @access Public
   */
  async assignToAssociation(req, res) {
    try {
      const { association_id } = req.body;

      const association = await getAssociationById(association_id);
      console.log(association);
      if (association) {
        const userAssociation = await addUserAssociation(req.user_id, {
          association_id: association.id,
        });

        if (userAssociation === 1) {
          return super.success(res, 200, "Driver assigned to association");
        }
        throw new Error("Unable to assign user to association");
      }
      throw new Error("Invalid association");
    } catch (error) {
      console.log(error);
      return super.error(res, 500, "Unable to assign driver to association");
    }
  }
}

module.exports = Drivers;
