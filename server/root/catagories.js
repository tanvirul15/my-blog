const router = require("express").Router();
const Catagory = require("../models/Catagory");

//Add a catagory
router.post("/", async (req, res) => {
  const newCat = new Catagory(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All Catagory
router.get("/", async (req, res) => {
  try {
    const cat = await Catagory.find();
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
