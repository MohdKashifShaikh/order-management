require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routing = require("./routes/routes");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", routing);

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/ECOMMERCE")
  .then(() => {
    console.log("DB Connected Successfully!");
  })
  .catch((err) => {
    console.log("Error in connecting to Database", err.toString());
  });

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in starting SERVER !");
  } else {
    console.log("SERVER Started on Port : ", PORT);
  }
});
