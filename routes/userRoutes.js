const express = require("express");
const router = express.Router();
const auth = require("../middlewars/auth");
const {
  userRegister,
  loginUser,
  logoutUser,
} = require("../controllers/userControllers");
const { body } = require("express-validator");
router.post(
  "/register",
  [
    body("username", "Campo Nombre de Usuario esta Vacio").notEmpty(),
    body("username", "ERR: Caracteres:  min 10, max 50").isLength({
      min: 10,
      max: 50,
    }),
    body("password", "Campo Contraseña Vacio").notEmpty(),
    body("password", "ERR: Caracteres: min 8 max 25").notEmpty({
      min: 8,
      max: 25,
    }),
  ],
  userRegister
);
router.post(
  "/login",
  [
    body("username", "Campo Nombre de Usuario esta Vacio").notEmpty(),
    body("username", "ERR: Caracteres:  min 10, max 50").isLength({
      min: 10,
      max: 50,
    }),
    body("password", "Campo Contraseña Vacio").notEmpty(),
    body("password", "ERR: Caracteres: min 8 max 25").notEmpty({
      min: 8,
      max: 25,
    }),
  ],
  loginUser
);
router.get("/logout", auth([process.env.SUPER_USER, "user"]), logoutUser);

module.exports = router;
