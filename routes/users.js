const express = require("express");

const DriversController = require("../controllers/users");

const { validateInput, validateToken } = require("../middlewares/index");
const {
  validateSignupInput,
  validateLoginInput,
  validateAssignToAssociationInput,
} = require("../validations/users");

const driversController = new DriversController();

const { login, register, assignToAssociation } = driversController;

const Router = express.Router();

// @route   POST api/v1/drivers
// @desc    Create new drivers
// @access  Public
Router.post("/register", validateInput(validateSignupInput), register);

// @route   GET api/v1/auth/drivers/login
// @desc    Login Users.
// @access  Private
Router.post("/login", validateToken, validateInput(validateLoginInput), login);

// @route   GET api/v1/auth/drivers/assignAssociation
// @desc    Assign Association.
// @access  Private
Router.post(
  "/assignAssociation",
  validateInput(validateAssignToAssociationInput),
  assignToAssociation
);

module.exports = Router;
