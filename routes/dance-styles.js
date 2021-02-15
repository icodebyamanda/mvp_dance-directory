var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// get everything from dance_styles
router.get('/', async function(req, res) {
  try{
    const response = await db("SELECT * FROM dance_styles;");
    res.send(response.data);
  }catch(err){
    res.send(err);
  }
});

// add a new dance style
router.post('/', async function(req, res) {
  const name = req.body.name;
  const url = req.body.url;
  const description = req.body.description;
  try{
    const response = await db(`INSERT INTO dance_styles (name, video_url, description) VALUES ("${name}", "${url}", "${description}");`);
    res.send({ message: "dance added successfully"});
  }catch(err){
    res.send(err);
  }
});

// update an existing dance style
router.put('/:id', async function(req, res) {
  try{
    const { id } = req.params;
    const currRecord = await db(`SELECT * FROM dance_styles WHERE id="${id}";`);
    const newRecord = {...currRecord, ...req.body};
    const response = await db(`UPDATE dance_styles SET name="${newRecord.name}",  video_url="${newRecord.url}", description="${newRecord.description}" WHERE id="${id}";`);
    res.send({message: "Record updated successfully"});
  } catch(err) {
    res.send(err);
  }

})

// delete a dance style
router.delete('/:id', async function(req, res) {
  const { id } = req.params;
  try{
    const response = await db(`DELETE FROM dance_styles WHERE id="${id}";`);
    res.send({message: "Record deleted successfully."});
  }catch(err){
    res.send(err);
  }
})



module.exports = router;
