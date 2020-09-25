const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validatePostInput = (data) => {
  let errors = {};

  let { requestContent, requestFavors } = data;

  // Converting empty fields to empty string for validating functions works
  requestContent = !isEmpty(requestContent) ? requestContent : '';
  requestFavors = !isEmpty(body) ? body : '';

  if (Validator.isEmpty(title)) {
    errors.title = 'Title is required';
  } else if (Validator.isEmpty(body)) {
    errors.body = 'Body is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
