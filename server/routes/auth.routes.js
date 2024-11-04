const express = require("express");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
const saltRounds = 10;

// POST /auth/signup
authRouter.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      res.status(400).json({ message: "Please provide all fields." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res
        .status(400)
        .json({ message: "Please provide a valid email address." });
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(password, salt);
    const createdUser = await User.create({ email, password: hashPass, name });
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ message: "Error while creating user." });
  }
});

// POST /auth/login

// GET /auth/verify

module.exports = authRouter;
