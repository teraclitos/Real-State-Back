const multer = require(`multer`);
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: path.join(__dirname, `public/uploads`),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }).array(`images`, 15);

module.exports = upload;
