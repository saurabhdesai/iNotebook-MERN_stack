var jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_key = "M1ddl3w@r3";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .json({ error: "Please authenticate yourself with valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_key);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Please authenticate yourself with valid token" });
  }
};
module.exports = fetchuser;
