const HttpError = require("../utils/httpError.util");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    throw HttpError.unproccessableEntity("Validation error", error.errors);
  }
};

module.exports = validate;
