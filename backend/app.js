const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path')
const app = express();

const Employee = require("./models/employee");
const employeesRoutes = require("./routes/employees");


mongoose
.connect(
  "mongodb://localhost:27017/employees", { useUnifiedTopology: true, useNewUrlParser: true }
)
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/employees",employeesRoutes)
module.exports = app;
