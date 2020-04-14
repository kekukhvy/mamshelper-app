const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const testRoutes = require("./routes/test");
const categoryRoutes = require("./routes/category");

mongoose
  .connect(
    "mongodb+srv://momsHelperUser:iap2nY5iQqeNXs@cluster0-pjau0.mongodb.net/momshelper?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection is up and running");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/test", testRoutes);
app.use("/api/category", categoryRoutes);

module.exports = app;
