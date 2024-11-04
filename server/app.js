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

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const cohortRouter = require("./routes/cohort.routes");

// Retrives all cohorts in the database collection
app.use("/api", cohortRouter);

// Creates a new cohort in the database collection
// app.use("/api", cohortRouter);

// Retrieves a specific cohort by id
app.get("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    await Cohort.findById({ _id: cohortId }).then((cohort) => {
      res.status(200).json(cohort);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cohort", error });
  }
});

// Updates a specific cohort by id
app.put("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    await Cohort.findByIdAndUpdate({ _id: cohortId }, req.body).then(
      (cohort) => {
        res.status(200).json(cohort);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cohort", error });
  }
});

// Deletes a specific cohort by id
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    await Cohort.findByIdAndDelete({ _id: cohortId }).then(() => {
      res.status(204).json();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting cohort", error });
  }
});

// Retrives all students in the database collection
app.get("/api/students", (req, res) => {
  try {
    Student.find()
      .populate("cohort")
      .then((students) => {
        res.status(200).json(students);
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Creates a new cohort in the database collection
app.post("/api/students", async (req, res) => {
  try {
    await Student.create(req.body).then((student) => {
      res.status(201).json(student);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating student", error });
  }
});

// Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  console.log(cohortId);

  try {
    await Student.find({ cohort: cohortId })
      .populate("cohort")
      .then((students) => {
        res.status(200).json(students);
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Retrieves a specific student by id
app.get("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    await Student.findById({ _id: studentId })
      .populate("cohort")
      .then((student) => {
        res.status(200).json(student);
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
});

// Updates a specific student by id
app.put("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    await Student.findByIdAndUpdate({ _id: studentId }, req.body).then(
      (student) => {
        res.status(200).json(student);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating student", error });
  }
});

// Deletes a specific student by id
app.delete("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    await Student.findByIdAndDelete({ _id: studentId }).then(() => {
      res.status(204).json();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting student", error });
  }
});

mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api").then((x) => {
  console.log(
    `Connected to the database Database name: "${x.connections[0].name}"`
  );
});

// ERROR HANDLING
require("./error-handling/index")(app);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
