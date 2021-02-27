var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const db = require("../model/helper");
var bcrypt = require("bcrypt");
require("dotenv").config();
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

const supersecret = process.env.SUPER_SECRET;

router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await db(
      `SELECT * FROM instructors WHERE email = "${username}"`
    );
    const user = results.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/profile", userShouldBeLoggedIn, function (req, res, next) {
  //db(`SELECT * from classes WHERE userId = ${req.user_id}`) -> advice from Germinal in real life go back on that about why?
  // db(`SELECT * from instructors WHERE userId = ${req.user_id}`) <- neither do something
  res.send({
    message: "Here is the PROTECTED data for user " + req.user_id,
  });
});

module.exports = router;