const express = require("express");

const DriversController = require("../controllers/drivers");

const { validateInput } = require("../middlewares/index");
const {validateSignupInput} = require("../validations/users");

// import {
//   validateInput,
//   validateToken,
//   isBusiness,
//   isVolunteer,
// } from "../middlewares";

const driversController = new DriversController();

const { login } = driversController;

const Router = express.Router();

// @route   POST api/v1/auth/requests
// @desc    Create new request
// @access  Private
Router.post("/", validateInput(validateSignupInput), login);

// // @route   GET api/v1/auth/requests/all
// // @desc    Get all requests.
// // @access  Private
// Router.get("/all", validateToken, isVolunteer, getAllRequests);

module.exports = Router;
