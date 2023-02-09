const PropertiesModel = require("../models/propertiesSchema");
const { validationResult } = require("express-validator");
exports.createProperty = async (req, res) => {
  const {
    price,
    name,
    images_URL,
    description,
    type,
    location,
    state,
    adress,
    antiquity,
    totalSurface,
    landSurface,
  } = req.body;

  const existProperty = await PropertiesModel.findOne({
    name: req.body.name,
  });
  if (
    price === "" &&
    name === "" &&
    images_URL === "" &&
    description === "" &&
    type === "" &&
    location === "" &&
    state === "" &&
    adress === "" &&
    antiquity === "" &&
    totalSurface === "" &&
    landSurface === ""
  ) {
    return res.status(422).json({
      msg: "Formulario Totalmente Vacio. Se debe completar campos OBlIGATORIOS del formulario",
    });
  } else {
    if (existProperty) {
      res.status(400).json({ msg: "propiedad duplicada" });
    } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      try {
        const newProperty = new PropertiesModel(req.body);
        await newProperty.save();
        res.status(201).json({ msg: "Propiedad Creada Correctamente" });
      } catch (error) {
        res.status(500).json({ msg: error });
      }
    }
  }
};
exports.getAllProperties = async (req, res) => {
  try {
    const allProperties = await PropertiesModel.find();
    res.status(200).json(allProperties);
  } catch (error) {
    console.log("error", error);
  }
};

exports.getOneProperty = async (req, res) => {
  try {
    const getOneProp = await PropertiesModel.findOne({ _id: req.params.id });
    res.status(200).json(getOneProp);
  } catch (error) {
    console.log("error", error);
  }
};

exports.modifyOneProperty = async (req, res) => {
  const {
    price,
    name,
    images_URL,
    description,
    type,
    location,
    state,
    adress,
    antiquity,
    totalSurface,
    landSurface,
  } = req.body;
  const errors = validationResult(req);

  if (
    price === "" &&
    name === "" &&
    images_URL === "" &&
    description === "" &&
    type === "" &&
    location === "" &&
    state === "" &&
    adress === "" &&
    antiquity === "" &&
    totalSurface === "" &&
    landSurface === ""
  ) {
    return res.status(422).json({
      msg: "Formulario Totalmente Vacio. Se debe completar todos los campos OBLIGATORIOS del formulario",
    });
  } else {
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const modifyProp = await PropertiesModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json(modifyProp);
    } catch (error) {
      console.log("error", error);
    }
  }
};

exports.deleteOneProperty = async (req, res) => {
  try {
    const deleteProp = await PropertiesModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (deleteProp) {
      res.status(200).json({ msg: "Propiedad Eliminada" });
    } else {
      res.status(400).json({ msg: "Propiedad no encontrada" });
    }
  } catch (error) {
    console.log("error", error);
  }
};
