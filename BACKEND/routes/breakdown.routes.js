const router = require("express").Router();

const {
  getBreakdowns,
  getBreakdown,
  addBreakdown,
  deleteBreakdown,
  updateBreakdown,
} = require("../controllers/breakdown.controllers.js");

// get all students
router.get("/getbreakdowns", getBreakdowns);

// get a single student
router.get("/getbreakdown:id", getBreakdown);

// add a new student
router.post("/addbreakdown", addBreakdown);

// delete a student
router.delete("/deletebreakdown:id", deleteBreakdown);

// update a student
router.patch("/updatebreakdown:id", updateBreakdown);

module.exports = router;
