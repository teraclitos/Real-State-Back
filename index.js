const express = require(`express`);
const app = express();
const morgan = require(`morgan`);
const cors = require(`cors`);
const multer = require(`multer`);
const path = require("path");
const { v4: uuidv4 } = require("uuid");

if (process.env.NODE_ENV !== `production`) {
  require("dotenv").config();
}
require("./dataBase");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(`dev`));
app.use(cors());
// const storage = multer.diskStorage({
//   destination: path.join(__dirname, `/public/uploads`),
//   filename: (req, file, cb) => {
//     cb(null, uuidv4() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage }).array(`images`, 15);
// module.exports = upload;

// app.get(`/`, (req, res) => {
//   res.render(`index`);
// });

const routes = require("./routes");

app.use("/", routes);

app.listen(PORT, () => {
  console.log("back ejecutandose en el puerto: ", PORT);
  console.log("enviroment:", process.env.NODE_ENV);
});
