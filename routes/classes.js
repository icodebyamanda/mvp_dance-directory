var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// get all info or user selection from classes
router.get('/', async function(req, res) {
  console.log("I am here.")
  let searchStmt = [];

  if(req.query){
    const style = req.query.style;
    const date = req.query.date;
    const partner = req.query.partner;

    if(style) {
      if(searchStmt.length > 0) searchStmt.push(`&& style="${style}"`);
      else{searchStmt.push(`WHERE style="${style}"`)}
    }
    if(date) {
      if(searchStmt.length > 0) searchStmt.push(`&& date="${date}"`);
      else{searchStmt.push(`WHERE date="${date}"`)}
    }
    if(partner) {
      if(searchStmt.length > 0) searchStmt.push(`&& partner="${partner}"`);
      else{searchStmt.push(`WHERE partner="${partner}"`)}
    }
  }

  try{
    console.log("inside try")
    const response = await db(`SELECT * FROM classes ${searchStmt.join("")};`);
    console.log(response.data)
    res.send(response.data);
  }catch(err){
    res.send(err);
  }
});

// add a new class
router.post('/', async function(req, res) {
  const name = req.body.name;
  const date = req.body.date;
  const time = req.body.time;
  const address = req.body.address;
  const price = req.body.price;
  const partner = req.body.partner;
  const style = req.body.style;
  const instructor = req.body.instructor;
  try{
    const response = await db(`INSERT INTO classes (name, date, time, address, price, partner, style, instructor) VALUES ("${name}", "${date}", "${time}", "${address}", "${price}", "${partner}", "${style}", "${instructor}");`);
    res.send({ message: "Class added successfully"});
  }catch(err){
    res.send(err);
  }
});

// update an existing class
router.put('/:id', async function(req, res) {
  try{
    const { id } = req.params;
    const currRecord = await db(`SELECT * FROM classes WHERE id="${id}";`);
    const newRecord = {...currRecord, ...req.body};
    const response = await db(`UPDATE classes SET name="${newRecord.name}", date="${newRecord.date}", time="${newRecord.time}", address="${newRecord.address}", price="${newRecord.price}", partner="${newRecord.partner}", style="${newRecord.style}", instructor="${newRecord.instructor}" WHERE id="${id}";`);
    res.send({message: "Record updated successfully"});
  } catch(err) {
    res.send(err);
  }

})

// delete a class
router.delete('/:id', async function(req, res) {
  const { id } = req.params;
  try{
    const response = await db(`DELETE FROM classes WHERE id="${id}";`);
    res.send({message: "Class deleted successfully."});
  }catch(err){
    res.send(err);
  }
})

module.exports = router;
