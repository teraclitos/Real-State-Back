const PropertiesModel = require("../models/propertiesSchema");
const { validationResult } = require("express-validator");
const fs = require(`fs-extra`);
const cloudinary = require("../api/cloudinary");

exports.createProperty = async (req, res, next) => {
  const {
    price,
    name,
    description,
    type,
    location,
    state,
    adress,
    antiquity,
    totalSurface,
    landSurface,
    highlight,
  } = req.body;

  const existProperty = await PropertiesModel.findOne({
    name: req.body.name,
  });

  const highlights = await PropertiesModel.find({ highlight: "YES" });

  console.log(highlights);

  const images = req.files;

  if (
    price === "" &&
    name === "" &&
    description === "" &&
    type === "" &&
    location === "" &&
    state === "" &&
    adress === "" &&
    antiquity === "" &&
    totalSurface === "" &&
    landSurface === "" &&
    images.length < 1
  ) {
    req.files.forEach((element, i) => {
      fs.unlink(element.path);
    });
    return res.status(422).json({
      msg: "Formulario Totalmente Vacio. Se debe completar campos OBLIGATORIOS del formulario",
    });
  } else {
    if (highlights.length === 4 && highlight === "YES") {
      return res.status(422).json({
        msg: "Sólo puede haber 4 propiedades destacadas",
      });
    }
    if (existProperty) {
      req.files.forEach((element, i) => {
        fs.unlink(element.path);
      });
      res.status(400).json({
        msg: "El nombre de esta propiedad ya existe. El nombre debe ser un dato único ",
      });
    } else {
      if (images.length < 1) {
        return res.status(422).json({
          msg: "Campo imagenes vacio",
        });
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.files.forEach((element, i) => {
          fs.unlink(element.path);
        });
        return res.status(422).json({ errors: errors.array() });
      }

      try {
        const arrayURLD = [];
        const arrayURLO = [];
        await req.files.forEach((element, i) => {
          cloudinary.v2.uploader
            .upload(element.path, {
              folder: `gori-inmobiliaria`,
              transformation: {
                width: 700,
                height: 700,
                crop: "fill",
                fetch_format: "auto",
                quality: "auto",
                gravity: "auto",
              },
            })
            .then((result) => {
              arrayURLD.push({
                url: result.secure_url,
                original_name: element.originalname.split(".")[0],
                order: parseInt(
                  element.originalname.split(".")[0].split("-")[1]
                ),
                public_id: result.public_id,
              });
              fs.unlink(element.path);
            })

            .then(() => {
              if (arrayURLD.length === req.files.length) {
                arrayURLD.forEach((element, i) => {
                  arrayURLD.forEach((element1) => {
                    if (element1.order === i + 1) {
                      arrayURLO.push(element1);
                    }
                  });
                });
              }
            })
            .then(async () => {
              if (arrayURLO.length === req.files.length) {
                const newProperty = new PropertiesModel({
                  price,
                  name,
                  description,
                  type,
                  location,
                  state,
                  adress,
                  antiquity,
                  totalSurface,
                  landSurface,
                  highlight,
                  images_URL: arrayURLO,
                });
                await newProperty.save();
                res.status(201).json({ msg: "Propiedad Creada Correctamente" });
              } else if (
                arrayURLO.length !== req.files.length &&
                arrayURLD.length === req.files.length
              ) {
                res
                  .status(400)
                  .json({ msg: "no respeto el orden de las imagenes" });
              }
            });
        });
      } catch (error) {
        res.status(500).json({ msg: error });
      }
    }
  }
};
exports.getAllProperties = async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const type = req.query.type;
  const location = req.query.location;
  const inf = req.query.inf;
  const sup = req.query.sup;
  const highlight = req.query.highlight;

  const options = {};

  if (type) {
    options.type = type;
  }
  if (location) {
    options.location = location;
  }

  if (inf && !sup) {
    options.price = { $gte: inf };
  }
  if (sup && !inf) {
    options.price = { $lte: sup };
  }
  if (inf && sup) {
    options.$and = [{ price: { $gte: inf } }, { price: { $lte: sup } }];
  }

  try {
    const allProperties = await PropertiesModel.paginate(options, {
      limit: limit,
      page: page,
    });
    res.status(200).json(allProperties);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

exports.getHighlightProperties = async (req, res) => {
  const highlight = req.query.highlight;

  try {
    const highlightProperties = await PropertiesModel.find({
      highlight: highlight,
    });
    res.status(200).json(highlightProperties);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

exports.getOneProperty = async (req, res) => {
  try {
    const getOneProp = await PropertiesModel.findOne({ _id: req.params.id });
    res.status(200).json(getOneProp);
  } catch (error) {
    res.status(500).json({ msg: error });
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
    highlight,
  } = req.body;
  const errors = validationResult(req);

  const highlights = await PropertiesModel.find({ highlight: "YES" });
  const toModify = await PropertiesModel.findOne({ _id: req.params.id });

  const allPropertiesWithoutToModify = await PropertiesModel.find({
    _id: { $ne: req.params.id },
  });

  console.log(allPropertiesWithoutToModify);
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
    if (
      highlights.length === 4 &&
      highlight === "YES" &&
      toModify.highlight === "NO"
    ) {
      return res.status(422).json({
        msg: "Sólo puede haber 4 propiedades destacadas",
      });
    }
    if (
      allPropertiesWithoutToModify.filter(
        (element) => element.name.toLowerCase() === name.toLowerCase()
      ).length > 0
    ) {
      return res.status(422).json({
        msg: "El nombre de esta propiedad ya existe. El nombre debe ser un dato único ",
      });
    }

    try {
      const modifyProp = await PropertiesModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json(modifyProp);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
};

exports.deleteOneProperty = async (req, res) => {
  try {
    const deleteProp = await PropertiesModel.findByIdAndDelete({
      _id: req.params.id,
    });

    deleteProp.images_URL.forEach((element) => {
      cloudinary.v2.uploader.destroy(element.public_id);
    });

    if (deleteProp) {
      res.status(200).json({ msg: "Propiedad Eliminada" });
    } else {
      res.status(400).json({ msg: "Propiedad no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
