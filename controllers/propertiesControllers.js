const PropertiesModel = require("../models/propertiesSchema");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary");
const fs = require(`fs-extra`);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
exports.createProperty = async (req, res) => {
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
  } = req.body;

  const existProperty = await PropertiesModel.findOne({
    name: req.body.name,
  });

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
    landSurface === ""
    // images.length < 1
  ) {
    // req.files.forEach((element, i) => {
    //   fs.unlink(element.path);
    // });
    return res.status(422).json({
      msg: "Formulario Totalmente Vacio. Se debe completar campos OBLIGATORIOS del formulario",
    });
  } else {
    if (existProperty) {
      // req.files.forEach((element, i) => {
      //   fs.unlink(element.path);
      // });
      res.status(400).json({ msg: "propiedad duplicada" });
    } else {
      // if (images.length < 1) {
      //   return res.status(422).json({
      //     msg: "Campo imagenes vacio",
      //   });
      // }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // req.files.forEach((element, i) => {
        //   fs.unlink(element.path);
        // });
        return res.status(422).json({ errors: errors.array() });
      }

      try {
        const arrayURLD = [];
        const arrayURLO = [];
        // await req.files.forEach((element, i) => {
        //   cloudinary.v2.uploader
        //     .upload(element.path)
        //     .then((result) => {
        //       arrayURLD.push({
        //         url: result.url,
        //         original_name: element.originalname.split(".")[0],
        //         order: parseInt(
        //           element.originalname.split(".")[0].split("-")[1]
        //         ),
        //         public_id: result.public_id,
        //       });
        //       fs.unlink(element.path);
        //     })

        //     .then(() => {
        // if (arrayURLD.length === req.files.length) {
        // arrayURLD.forEach((element, i) => {
        //   arrayURLD.forEach((element1) => {
        //     if (element1.order === i + 1) {
        //       arrayURLO.push(element1);
        //     }
        //   });
        // });
        // }
        // })
        // .then(async () => {
        // if (arrayURLD.length === req.files.length) {
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
          images_URL: arrayURLO,
        });
        await newProperty.save();
        res.status(201).json({ msg: "Propiedad Creada Correctamente" });
        // }
        // });
        // });
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

    // deleteProp.images_URL.forEach((element) => {
    //   cloudinary.v2.uploader.destroy(element.public_id);
    // });

    if (deleteProp) {
      res.status(200).json({ msg: "Propiedad Eliminada" });
    } else {
      res.status(400).json({ msg: "Propiedad no encontrada" });
    }
  } catch (error) {
    console.log("error", error);
  }
};
