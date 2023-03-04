const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");

// const Car = require("./models/Car");

require("dotenv/config");
// const csv = require("csvtojson");
// const csvFilePath = path.join(__dirname, "data.csv");
// csv()
//   .fromFile(csvFilePath)
//   .then((jsonObj) => {
//     let cars = structuredClone(jsonObj);
//     for (car of cars) {
//       car.release_date = parseInt(car.release_date);
//       car.price = parseInt(car.price);
//       car.isDeleted = false;
//     }
//     Car.insertMany(cars)
//       .then(() => {
//         console.log("Insert Success");
//       })
//       .then((err) => {
//         console.log("Insert Error", err);
//       });
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */
//   });
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MONGODB
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to Database!");
});

app.use("/", indexRouter);

module.exports = app;
