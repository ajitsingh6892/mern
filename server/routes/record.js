const express = require("express");
const Records = require('../models/Records')
// Middleware for data validation
const {check, validationResult }= require('express-validator')
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();





// Total ROUTES = 4

// 1. GET RECORDS
// 2. CREATE RECORDS
// 3. UPDATE RECORDS
// 4. DELETE RECORDS



// 1. GET RECORD
recordRoutes.get('/', async(req, res)=>{
  try {
    const recordData = await Records.find()
    res.json(recordData)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error - GET (503001)")
}
})


// 2. CREATE RECORDS
recordRoutes.post('/add',[
  check('person_name','Please enter Valid Person Name').not().isEmpty(),
  check('person_position','Please enter Position').not().isEmpty(),
  check('person_level','Please enter level').not().isEmpty(),
  ], 
  async(req,res)=>{
  
  // We have added middleware to validate the data
  // Now we will see if data as any errors or not
  // If it contains any errors, we will return from here
  const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }

  let {person_name, person_position, person_level} = req.body;
  
  try {
    //Create an object to be stored in DB
    let recordData = new Records({
      person_name, 
      person_position, 
      person_level
    })
    await recordData.save()

    res.json("Data Added Succesfully.")
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error - POST (503002)")
  }
})


// 3. UPDATING RECORDS
recordRoutes.put('/:id',
    [
      check('person_name','Please enter Valid Person Name').not().isEmpty(),
      check('person_position','Please enter Position').not().isEmpty(),
      check('person_level','Please enter level').not().isEmpty(),
    ],
    async (req,res)=>{
      const error = validationResult(req)
        if(!error.isEmpty()){
          return res.status(400).json({error: error.array()})
        }
      try {
          let recordFind = await Records.findById(req.params.id)
          try {
              recordFind =  await Records.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
              res.json(recordFind)
          } catch (error) {
              console.error(error.message)
              res.status(500).send("Server Error - PUT (503003)")
          }
      } catch (error) {
          res.status(400).json({error:"This Record does not exist."})
      }
})


// 4. DELETE RECORD
recordRoutes.delete('/:id', async(req,res)=>{
  try {
    let recordFind = await Records.findById(req.params.id)
    try {
        recordFind =  await Records.findByIdAndDelete(req.params.id)
        res.status(200).json("Record Deleted Succesfully")
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error - DELETE (503004)")
    }
} catch (error) {
    res.status(400).json({error:"This Record does not exist."})
}
})


// // This section will help you create a new record.
// recordRoutes.route("/record/add").post(function (req, res) {
//   let db_connect = dbo.getDb("employees");
//   let myobj = {
//     person_name: req.body.person_name,
//     person_position: req.body.person_position,
//     person_level: req.body.person_level,
//   };
//   db_connect.collection("records").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//   });
// });

// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, res) {
//   let db_connect = dbo.getDb("employees");
//   let myquery = { id: req.body.id };
//   let newvalues = {
//     $set: {
//       person_name: req.body.person_name,
//       person_position: req.body.person_position,
//       person_level: req.body.person_level,
//     },
//   };
//   db_connect
//     .collection("records")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//     });
// });

// This section will help you delete a record
// recordRoutes.route("/:id").delete((req, res) => {
//   let db_connect = dbo.getDb("employees");
//   var myquery = { id: req.body.id };
//   db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//   });
// });

module.exports = recordRoutes;