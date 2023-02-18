const mongoose = require(`mongoose`);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("base de dato ok");
  }
});
