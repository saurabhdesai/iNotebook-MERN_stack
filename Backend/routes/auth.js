const express = require("express");
// const { body } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const JWT_key = "M1ddl3w@r3";
const fetchuser = require("../middleware/fetchuser");
router.post(
  "/createuser",
  [
    body("name", "Name should be atleast 3 characters").isLength({ min: 3 }),
    body(
      "password",
      "Password length should contains atleast 3 characters"
    ).isLength({ min: 3 }),
    body("email", "Enter valid Email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(500)
          .json({ success, error: "Please enter unique value for email" });
      }
      const salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: password,
        email: req.body.email,
      });
      const data = { user: { id: user.id } };
      var authToken = jwt.sign(data, JWT_key);
      let success = true;
      res.json({ success, authtoken: authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("somthing went wrong");
    }
    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({ error: "please enter unique value for email" });
    // });
  }
);

router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password length should be valid").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credential" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res.status(400).json({
          success,
          error: "please try to login with correct credential",
        });
      }
      const userdata = {
        user: { id: user.id },
      };

      var authToken = jwt.sign(userdata, JWT_key);
      res.json({ success: true, authtoken: authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("somthing went wrong");
    }
    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({ error: "please enter unique value for email" });
    // });
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const userdata = await User.findById(userid).select("-password");
    res.json(userdata);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("somthing went wrong");
  }
  // .then((user) => res.json(user))
  // .catch((err) => {
  //   console.log(err);
  //   res.json({ error: "please enter unique value for email" });
  // });
});

module.exports = router;
