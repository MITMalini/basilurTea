const BagCount = require("../models/bagcount.models.js");

//get all BagCounts

const getBagCounts = async (req, res) => {
  const bagcounts = await BagCount.find();

  if (!bagcounts) {
    return res
      .status(404)
      .json({ message: "No any available bagcounts found" });
  } else {
    return res.status(200).json(bagcounts);
  }
};

//get / serach a single BagCount

const getBagCount = async (req, res) => {
  const { id } = req.params;

  const bagcount = await BagCount.findById({ _id: id });

  if (!bagcount) {
    return res.status(404).json({ message: "No bagcount found" });
  } else {
    return res.status(200).json(bagcount);
  }
};

//add new BagCount

const addBagCount = async (req, res) => {
  const { machinenumber, mrnnumber, bagcount } = req.body;

  try {
    const bagcount = await BagCount.create({
      machinenumber,
      mrnnumber,
      bagcount,
    });

    return res.status(200).json(bagcount);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

//delete a BagCount

const deleteBagCount = async (req, res) => {
  const { id } = req.params;

  const bagcount = await BagCount.findOneAndDelete({ _id: id });

  if (!bagcount) {
    return res.status(400).json({ bagcount: "No such bagcount" });
  } else {
    return res.status(200).json({ message: "BagCount deleted successfully" });
  }
};

//update a BagCount

const updateBagCount = async (req, res) => {
  const { id } = req.params;

  const bagcount = await BagCount.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!bagcount) {
    return res.status(400).json({ bagcount: "No such bagcount" });
  } else {
    return res.status(200).json(bagcount);
  }
};

module.exports = {
  getBagCounts,
  getBagCount,
  addBagCount,
  deleteBagCount,
  updateBagCount,
};
