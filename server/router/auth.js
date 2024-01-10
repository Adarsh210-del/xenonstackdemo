const express = require('express');
const router = express.Router();
const multer = require('multer');
require('../db/conn');
const { v4: uuidv4 } = require('uuid');
const hashing = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authentication");
const User = require('../model/userschema');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const path = require('path');


const fs = require('fs');
router.get('/', (req, res) => {
  res.send("Hello Router");
});


//Using Async Await
router.post('/register', async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json("Error!!! Please fill all the details properly");
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ error: "User Already exists" });
    }
    else if (password != cpassword) {
      return res.status(422).json({ error: "Please check your Password " });
    }
    else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //Hashing Of Password will be done before save 

      const userRegister = await user.save();
      if (userRegister) {
        res.status(201).json({ message: "Registered Successfully" });
      }
    }

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login

router.post('/login', async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please Fill Your Details");
    }
    const login = await User.findOne({ email: email });

    if (login) {
      const isMatch = await hashing.compare(password, login.password);

      token = await login.generateAuthToken();
      // console.log(token);
      res.cookie("jwtoken", token,
        {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        });

      if (!isMatch) {
        res.status(404).json({ error: "Failed to Sign In" })
      }
      else {
        res.status(201).json({ message: "Sign In Successfully" });
      }
    }
    else {
      res.status(422).json({ error: "Invalid Credentials" });
    }

  }
  catch (err) {
    console.log(err);
  }

});

router.get('/about', authenticate, (req, res) => {
  res.send(req.rootUser);

});
router.get('/getdata', authenticate, (req, res) => {
  res.status(200).send(req.rootUser);

});
router.get('/logout', authenticate, (req, res) => {
  res.clearCookie('jwtoken', { path: '/' });
  res.status(200).send(`User Logout`);

});

module.exports = router;