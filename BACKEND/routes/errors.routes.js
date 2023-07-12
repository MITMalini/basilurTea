const router = require("express").Router();

const {
  getErrors,
  getError,
  addError,
  deleteError,
  updateError,
} = require("../controllers/errors.controller.js");

// get all students
router.get("/geterrors", getErrors);

// get a single student
router.get("/geterror:id", getError);

// add a new student
router.post("/adderror", addError);

// delete a student
router.delete("/deleteerror:id", deleteError);

// update a student
router.patch("/updateerror:id", updateError);

module.exports = router;
