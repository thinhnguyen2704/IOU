const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const validateSignupInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
const passport = require("passport");

// Signup Route
router.post("/signup", (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  const { userName, password } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ userName }).then((user) => {
    if (user) {
      if (user.userName === userName) {
        return res.status(400).json({
          userName: "Username " + user.userName + " is already taken",
        });
      }
    } else {
      const newUser = new User({ userName, password });

      //Hashing password before storing in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                userName: newUser.userName,
              };
              jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err) {
                  console.log(err);
                }
                return res.json({
                  success: true,
                  token: "Bearer " + token,
                  userName: user.userName,
                  userID: user._id,
                });
              });
            })
            .catch((err) => console.log({ error: "Cannot create new user" }));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { userName, password } = req.body;
  User.findOne({ userName }).then((user) => {
    if (!user) {
      return res.status(404).json({ userName: "Username not found!" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          // id: user.userID,
          userName: user.userName,
        };
        jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
          if (err) {
            console.log(err);
          }
          return res.json({
            success: true,
            token: "Bearer " + token,
            userName: user.userName,
            userID: user._id,
          });
        });
      } else {
        return res.status(400).json({ password: "Incorrect Password!" });
      }
    });
  });
});

router.get("/users", (req, res) => {
  User.find({}, "userName completedRequest").then((users) => {
    if (users.length != "undefined") return res.status(200).json(users);
  });
});

router.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Session available");
  }
);

module.exports = router;
