const userModel = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.userRegister = async (req, res) => {
  const { username, password } = req.body;

  if (username === "" && password === "") {
    return res.status(422).json({
      msg: "Formulario Totalmente Vacio. Se debe completar TODO el formulario",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    const passwordEncrypt = await bcryptjs.hash(req.body.password, salt);

    const newUserObj = {
      username: req.body.username,
      password: passwordEncrypt,
    };

    const newUser = new userModel(newUserObj);
    newUser.save();
    res.status(201).json({ msg: "Usuario Creado Correctamente" });
  } catch (error) {
    console.log("error user", error);
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (username === "" && password === "") {
    return res.status(422).json({
      msg: "Formulario Totalmente Vacio. Se debe completar TODO el formulario",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;
    const userExist = await userModel.findOne({ username });

    if (!userExist) {
      res.status(404).json({ message: "usuario y/o contraseña incorrecto" });
    }

    const passCheck = await bcryptjs.compare(password, userExist.password);

    if (!passCheck) {
      res.status(404).json({ message: "usuario y/o contraseña incorrecto" });
    }

    const datosUsuarioParaToken = {
      user: {
        id: userExist.id,
        username: userExist.username,
        role: userExist.role,
      },
    };

    const token = jwt.sign(datosUsuarioParaToken, process.env.JWT_SECRET);
    userExist.token = token;
    await userModel.updateOne({ username }, userExist);
    res.status(200).json(userExist);
  } catch (error) {
    console.log(error);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    await userModel.updateOne(
      { _id: res.locals.user.id },
      { $set: { token: "" } }
    );
    res.json({ mensaje: "Deslogueo ok" });
  } catch (error) {
    console.log(error);
  }
};
