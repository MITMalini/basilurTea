const router = require("express").Router();

const {
  getBagCounts,
  getBagCount,
  addBagCount,
  deleteBagCount,
  updateBagCount,
} = require("../controllers/bagcount.controllers.js");

// get all students
router.get("/getbagcounts", getBagCounts);

// get a single student
router.get("/getbagcount:id", getBagCount);

// add a new student
router.post("/addbagcount", addBagCount);

// delete a student
router.delete("/deletebagcount:id", deleteBagCount);

// update a student
router.patch("/updatebagcount:id", updateBagCount);

module.exports = router;
