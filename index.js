const express = require(`express`);
const app = express();
const morgan = require(`morgan`);
const cors = require(`cors`);
const path = require(`path`);

if (process.env.NODE_ENV !== `production`) {
  require("dotenv").config();
}
require("./dataBase");
const PORT = process.env.PORT || 3001;
// app.set(`views`, path.join(__dirname, `views`));
// app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(`dev`));
app.use(cors());

// app.get(`/`, (req, res) => {
//   res.render(`index`);
// });

const routes = require("./routes");

app.use("/", routes);

app.listen(PORT, () => {
  console.log("back ejecutandose en el puerto: ", PORT);
  console.log("enviroment:", process.env.NODE_ENV);
});
