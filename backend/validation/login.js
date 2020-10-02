const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateLoginInput = (data) => {
  let errors = {};

  let { userName, password } = data;

  // Convert empty fields to empty string for validating 
  userName = !isEmpty(userName) ? userName : '';
  password = !isEmpty(password) ? password : '';

  if (Validator.isEmpty(userName)) {
    errors.userName = 'Username is required';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password is required';
  } else if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
