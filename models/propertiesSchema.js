const mongoose = require(`mongoose`);
const PropertiesSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  type: { type: String, trim: true, required: true },
  price: { type: Number, trim: true, required: true },
  images_URL: { type: Array, required: true },
  description: { type: String, trim: true, required: true },
  location: { type: String, trim: true, required: true },
  state: { type: String, trim: true, required: true },
  adress: { type: String, trim: true, required: true },
  antiquity: { type: String, trim: true, required: true },
  totalSurface: { type: Number, trim: true },
  landSurface: { type: Number, trim: true },
  highlight: { type: Boolean, default: false },
});
const PropertiesModel = mongoose.model("property", PropertiesSchema);
module.exports = PropertiesModel;
