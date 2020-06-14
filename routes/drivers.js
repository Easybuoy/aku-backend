const express = require("express");

const DriverController = require("../controllers/driver");

// import {
//   validateRequestInput,
//   validateActionInput,
// } from "../validations/request";
// import {
//   validateInput,
//   validateToken,
//   isBusiness,
//   isVolunteer,
// } from "../middlewares";

const driverController = new DriverController();

const { login } = driverController;

const Router = express.Router();

// @route   POST api/v1/auth/requests
// @desc    Create new request
// @access  Private
Router.post(
  "/",
  //   validateToken,
  //   isBusiness,
  //   validateInput(validateRequestInput),
  login
);

// // @route   GET api/v1/auth/requests/all
// // @desc    Get all requests.
// // @access  Private
// Router.get("/all", validateToken, isVolunteer, getAllRequests);

module.exports = Router;
