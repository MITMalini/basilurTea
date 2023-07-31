const router = require("express").Router();

const {
  getIsBreakdowns,
  getIsBreakdown,
  addIsBreakdown,
  deleteIsBreakdown,
  updateIsBreakdown,
} = require("../controllers/isbreakdown.controllers");

// get all students
router.get("/getisbreakdowns", getIsBreakdowns);

// get a single student
router.get("/getisbreakdown:id", getIsBreakdown);

// add a new student
router.post("/addisbreakdown", addIsBreakdown);

// delete a student
router.delete("/deleteisbreakdown:id", deleteIsBreakdown);

// update a student
router.patch("/updateisbreakdown:id", updateIsBreakdown);

module.exports = router;
