const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema");

module.exports = (role) => async (req, res, next) => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const userLogin = await UserModel.findOne({ _id: verify.user.id, token });

    if (userLogin.role !== role && !Array.isArray(role)) {
      res.status(401).json({ msg: "No estas autorizado" });
    } else if (Array.isArray(role) && !role.includes(verify.user.role)) {
      res.status(401).json({ msg: "No estas autorizado" });
    }

    (res.locals.user = userLogin), (res.locals.token = token);
    next();
  } catch (error) {
    res.status(500).json({ msg: "Fallo Server", error });
  }
};
