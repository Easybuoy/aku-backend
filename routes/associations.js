const express = require("express");

const AssociationsController = require("../controllers/associations");

const { validateInput, validateToken } = require("../middlewares/index");
const {
  validateCreateAssociationInput,
} = require("../validations/associations");

const associationsController = new AssociationsController();

const { createAssociation } = associationsController;

const Router = express.Router();

// @route   POST api/v1/associations
// @desc    Create new association
// @access  Public
Router.post(
  "/",
  validateInput(validateCreateAssociationInput),
  createAssociation
);

module.exports = Router;
