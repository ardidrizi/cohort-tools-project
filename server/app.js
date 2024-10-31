const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const Student = require("./models/Students.model");
const Cohort = require("./models/Cohorts.model");
// const students = require("./students.json");
// const cohorts = require("./cohorts.json");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts/", (req, res) => {
  try {
    Cohort.find().then((cohorts) => {
      res.status(200).json(cohorts);
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cohorts", error });
  }
});

app.get("/api/students", (req, res) => {
  try {
    Student.find().then((students) => {
      res.status(200).json(students);
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api").then((x) => {
  console.log(
    `Connected to the database Database name: "${x.connections[0].name}"`
  );
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
