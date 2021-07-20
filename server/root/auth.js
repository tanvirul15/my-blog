const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
//Register
router.post("/register", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hasshedPass = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hasshedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Log In

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      console.log("User not found");
      res.status(400).json("Wrong credentials!");
      return;
    }

    const validate = bcrypt.compareSync(req.body.password, user.password);
    console.log(validate);

    if (!validate) {
      console.log("User not validated");
      res.status(400).json("Wrong credentials!");
      return;
    }

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
