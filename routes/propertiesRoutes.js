const router = require("express").Router();
const propertiesControllers = require("../controllers/propertiesControllers");
const { body } = require("express-validator");
const auth = require("../middlewars/auth");
const uploadFile = require("../middlewars/multer");
const multer = require(`multer`);

router.post(
  "/create",
  auth(process.env.SUPER_USER),
  (req, res, next) => {
    uploadFile()(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send("un error a ocurrido en multer");
      } else if (err) {
        res.send("un error desconocido a ocurrido en multer");
      }
      res.send("todo a salido bien");
    });
    next();
  },
  [
    body("price", "Campo Precio Vacio").notEmpty(),
    body("name", "Campo Nombre Vacio").notEmpty(),
    body("description", "Campo Descripcion Vacio").notEmpty(),
    body("price", "Campo Precio Vacio").notEmpty(),
    body("antiquity", "Campo Antiguedad Vacio").notEmpty(),
    body("state", "Campo Estado Vacio").notEmpty(),
    body("totalSurface", "Campo Superficie Total Vacio").notEmpty(),
    body("landSurface", "Campo Superficie Del Terreno  Vacio").notEmpty(),
    body("location", "Campo Localidad Vacio").notEmpty(),
    body("adress", "Campo Direccion Vacio").notEmpty(),
  ],
  propertiesControllers.createProperty
);

router.get("/show", propertiesControllers.getAllProperties);
router.get("/show:id", propertiesControllers.getOneProperty);
router.put(
  "/modify:id",
  auth(process.env.SUPER_USER),
  [
    body("name", "Campo Nombre Vacio").notEmpty(),
    body("type", "Campo Tipo Vacio").notEmpty(),
    body("images_URL", "Campo Imagenes Vacio").notEmpty(),
    body("description", "Campo Descripcion Vacio").notEmpty(),
    body("price", "Campo Precio Vacio").notEmpty(),
    body("antiquity", "Campo Antiguedad Vacio").notEmpty(),
    body("state", "Campo Estado Vacio").notEmpty(),
    body("totalSurface", "Campo Superficie Total Vacio").notEmpty(),
    body("landSurface", "Campo Superficie Del Terreno  Vacio").notEmpty(),
    body("location", "Campo Localidad Vacio").notEmpty(),
    body("adress", "Campo Direccion Vacio").notEmpty(),
  ],

  propertiesControllers.modifyOneProperty
);
router.delete(
  "/delete:id",

  auth(process.env.SUPER_USER),
  propertiesControllers.deleteOneProperty
);

module.exports = router;
