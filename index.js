const express = require(`express`);
const app = express();
const morgan = require(`morgan`);
const cors = require(`cors`);
require("dotenv").config();
require("./dataBase");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(`dev`));
app.use(cors());

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log("back ejecutandose en el puerto: ", PORT);
});
