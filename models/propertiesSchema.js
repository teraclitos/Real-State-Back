const mongoose = require(`mongoose`);
const mongoosePagination = require("mongoose-paginate-v2");

const PropertiesSchema = new mongoose.Schema({
  name: { type: String, trim: true, requiere: true },
  type: { type: String, trim: true, requiere: true },
  price: { type: Number, trim: true, requiere: true },
  images_URL: { type: Array },
  description: { type: String, trim: true, requiere: true },
  location: { type: String, trim: true, requiere: true },
  state: { type: String, trim: true, requiere: true },
  adress: { type: String, trim: true, requiere: true },
  antiquity: { type: Number, trim: true, requiere: true },
  totalSurface: { type: Number, trim: true, requiere: true },
  landSurface: { type: Number, trim: true },
  highlight: { type: String, default: `NO` },
  date: { type: Date, default: Date.now() },
});

PropertiesSchema.plugin(mongoosePagination);
const PropertiesModel = mongoose.model("property", PropertiesSchema);
module.exports = PropertiesModel;
