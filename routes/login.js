var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

