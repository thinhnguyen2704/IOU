const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateLoginInput = (data) => {
  let errros = {};

  let { email, password } = data;

  //converting empty feilds to empty string for validations functions to work
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (Validator.isEmpty(email)) {
    errros.email = 'Email is required';
  } else if (Validator.isEmail(email)) {
    errros.email = 'Please enter a valid email address';
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
