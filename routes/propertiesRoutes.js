const router = require("express").Router();
const propertiesControllers = require("../controllers/propertiesControllers");
const { body } = require("express-validator");

router.post(
  "/create",

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

  [
    body("price", "Campo Precio Vacio").notEmpty(),
    body("name", "Campo Nombre Vacio").notEmpty(),
    body("images_URL", "Campo Imagen Vacio").notEmpty(),
    body("description", "Campo Descripcion Vacio").notEmpty(),
  ],
  propertiesControllers.modifyOneProperty
);
router.delete("/delete:id", propertiesControllers.deleteOneProperty);

module.exports = router;
