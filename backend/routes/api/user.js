const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const User = require('../../models/User');

// Signup Route
router.post('/signup', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  const { userID, userName, password, numOfDebts, numOfCompletedRequests} = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ $or: [{ userName }] }).then((user) => {
    if (user) {
      if (user.userName === userName) {
        return res.status.json({ userName: 'Username is already taken' });
      }
    } else {
      numOfDebts, numOfCompletedRequests = 0;
      const newUser = new User({ userID, userName, password, numOfDebts, numOfCompletedRequests});

      //Hashing password before storing in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log({ err: 'Cannot creating new user' }));
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { userName, password } = req.body;
  User.findOne({ userName }).then((user) => {
    if (!user) {
      return res.status(404).json({ UserName: 'User name not found' });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          userName: user.userName,
        };
        jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
          if (err) {
            console.log(err);
          }
          return res.json({
            success: true,
            token: 'Bearer ' + token,
          });
        });
      } else {
        return res.status(400).json({ password: 'Password Incorrected' });
      }
    });
  });
});

module.exports = router;

