const jwt = require("../config/token");

module.exports = async (req, res, next) => {
  try {
    req.userData = await jwt.verifyToken(req.headers.token);
    next();
  } catch {
    res.send("Invalid Token");
  }
};
