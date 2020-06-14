const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.DB_URL);

const { DB_URL } = process.env;
//connecting to mongodb
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("unable to connect to mongdb", err);
  });
