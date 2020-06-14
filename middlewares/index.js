/**
 * validateInput
 * @param {function} validationMethod
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} object
 * @description This function returns object of validations required.
 */
const validateInput = (validationMethod) => (req, res, next) => {
  const { errors, isValid } = validationMethod(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json({ status: "error", errors });
  }

  next();
};

module.exports = { validateInput };
