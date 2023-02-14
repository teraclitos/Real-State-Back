const router = require("express").Router();
const propertiesControllers = require("../controllers/propertiesControllers");
const { body } = require("express-validator");
const auth = require("../middlewars/auth");

router.post(
  "/create",
  auth("admin"),

  [
    body("price", "Campo Precio Vacio").notEmpty(),
    body("name", "Campo Nombre Vacio").notEmpty(),
    body("images_URL", "Campo Imagen Vacio").notEmpty(),
    body("description", "Campo Descripcion Vacio").notEmpty(),
  ],
  propertiesControllers.createProperty
);

router.get("/show", propertiesControllers.getAllProperties);
router.get("/show:id", propertiesControllers.getOneProperty);
router.put(
  "/modify:id",
  auth("admin"),

  [
    body("price", "Campo Precio Vacio").notEmpty(),
    body("name", "Campo Nombre Vacio").notEmpty(),
    body("images_URL", "Campo Imagen Vacio").notEmpty(),
    body("description", "Campo Descripcion Vacio").notEmpty(),
  ],

  propertiesControllers.modifyOneProperty
);
router.delete(
  "/delete:id",
  auth("admin"),
  propertiesControllers.deleteOneProperty
);

module.exports = router;
