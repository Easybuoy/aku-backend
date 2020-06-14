const express = require("express");

const DriversController = require("../controllers/users");

const { validateInput } = require("../middlewares/index");
const {
  validateSignupInput,
  validateLoginInput,
} = require("../validations/users");

// import {
//   validateInput,
//   validateToken,
//   isBusiness,
//   isVolunteer,
// } from "../middlewares";

const driversController = new DriversController();

const { login, register } = driversController;

const Router = express.Router();

// @route   POST api/v1/drivers
// @desc    Create new drivers
// @access  Private
Router.post("/register", validateInput(validateSignupInput), register);

// @route   GET api/v1/auth/requests/all
// @desc    Get all requests.
// @access  Private
Router.post("/login", validateInput(validateLoginInput), login);

module.exports = Router;
