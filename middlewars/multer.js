const multer = require(`multer`);
const path = require("path");
const { v4: uuidv4 } = require("uuid");
let folder = "";

if (process.env.NODE_ENV === `production`) {
  folder = `../../../tmp`;
} else {
  folder = `/tmp`;
}

module.exports = uploadFile = () => {
  const storage = multer.diskStorage({
    destination: path.join(__dirname, folder),
    filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage }).array(`images`);

  return upload;
};
