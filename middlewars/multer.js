const multer = require(`multer`);
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: "./tmp/",
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }).array(`images`, 15);
module.exports = upload;
