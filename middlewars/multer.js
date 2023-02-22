const multer = require(`multer`);
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports = uploadFile = () => {
  const storage = multer.diskStorage({
    destination: require.main?.path + "/" + "..public/uploads/",
    filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage }).array(`images`);

  return upload;
};
