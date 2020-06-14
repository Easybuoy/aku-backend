const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateContributeInput = (input) => {
  const errors = {};
  const data = input;

  data.amount = !isEmpty(data.amount) ? data.amount : "";

  if (Validator.isEmpty(data.amount)) {
    errors.amount = "amount field is required";
  }
  if (!Validator.isFloat(data.amount)) {
    errors.amount = "amount must be a float";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = { validateContributeInput };
