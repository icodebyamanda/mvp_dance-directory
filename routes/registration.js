var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
//require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { name, introduction, email, password, photo } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO instructors (name, introduction, email, password, photo) VALUES ("${name}", "${introduction}", "${email}", "${hash}", "${photo}")`
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;