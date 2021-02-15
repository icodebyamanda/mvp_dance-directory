require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "mvp_dancing",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // let sql = "DROP TABLE if exists items; CREATE TABLE items(id INT NOT NULL AUTO_INCREMENT, text VARCHAR(40) not null, complete BOOLEAN, PRIMARY KEY (id));";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table creation `items` was successful!");

  //   console.log("Closing...");
  // });

  let sql = "DROP TABLE if exists classes; CREATE TABLE classes (id INT NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, date DATE NOT NULL, time TIME NOT NULL, address varchar(255) NOT NULL, price double NOT NULL, partner BOOLEAN NOT NULL,style INT NOT NULL, instructor INT NOT NULL, PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation 'classes' was successful!");
    console.log("Closing...");
  });

  sql="DROP TABLE if exists dance_styles; CREATE TABLE dance_styles (id INT NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, video_url varchar(255) NOT NULL, description TEXT NOT NULL, PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation 'dance_styles' was successful!");
    console.log("Closing...");
  });

  sql="DROP TABLE if exists instructors; CREATE TABLE instructors (id INT NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, introduction TEXT NOT NULL, email varchar(255) NOT NULL, PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation 'instructors' was successful!");
    console.log("Closing...");
  });

  con.end();
});


