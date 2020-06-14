const express = require("express");

const ContributionsController = require("../controllers/contributions");

const { validateInput, validateToken } = require("../middlewares/index");
const { validateContributeInput } = require("../validations/contributions");

const contributionsController = new ContributionsController();

const { contribute, getContributions } = contributionsController;

const Router = express.Router();

// @route   GET api/v1/contributions/contribute
// @desc    Assign Association.
// @access  Private
Router.post(
  "/contribute",
  validateToken,
  validateInput(validateContributeInput),
  contribute
);

// @route   GET api/v1/contributions/
// @desc    Get all Contributions.
// @access  Private
Router.get("/", validateToken, getContributions);

module.exports = Router;
