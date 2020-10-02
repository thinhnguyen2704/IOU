const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateSignupInput = (data) => {
  let errors = {};

  let{userName, email, password} = data;

  // Converting empty fields to empty string for validating works
  userName = !isEmpty(userName) ? userName : '';
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (Validator.isEmpty(userName)) {
    errors.userName = 'Username is required';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Please enter a valid email';
  }

  if (Validator.isEmpty(password)) {
    errros.password = 'Password is required';
  } else if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errros.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
