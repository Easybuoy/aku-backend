const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateDriversInput = (data) => {
  console.log(data);
  let errors = {};
  data.driver_id = !isEmpty(data.driver_id) ? data.driver_id : "";

  if (Validator.isEmpty(data.driver_id)) {
    errors.driver_id = "drivers field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
