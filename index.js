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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(`dev`));
app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));
const routes = require("./routes");

app.use("/", routes);

app.listen(PORT, () => {
  console.log("back ejecutandose en el puerto: ", PORT);
  console.log("enviroment:", process.env.NODE_ENV);
});
