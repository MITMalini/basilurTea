const router = require("express").Router();

const {
  getNomrnBreakdowns,
  getNomrnBreakdown,
  addNomrnBreakdown,
  deleteNomrnBreakdown,
  updateNomrnBreakdown,
} = require("../controllers/nomrnbreakdown.controllers");

// get all students
router.get("/getnomrnBreakdowns", getNomrnBreakdowns);

// get a single student
router.get("/getnomrnBreakdown:id", getNomrnBreakdown);

// add a new student
router.post("/addnomrnBreakdown", addNomrnBreakdown);

// delete a student
router.delete("/deletenomrnBreakdown:id", deleteNomrnBreakdown);

// update a student
router.patch("/updatenomrnBreakdown:id", updateNomrnBreakdown);

module.exports = router;
