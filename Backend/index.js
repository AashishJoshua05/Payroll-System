const express = require("express");
const cors = require("cors");
// const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Employee = require("./models/Employee");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const secretKey = "23fas21ad231231jd";
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://BlogWeb:SZRgmi5Lj8f1dINi@cluster0.ousdupv.mongodb.net/?retryWrites=true&w=majority"
);

const PORT = process.env.PORT || 4000;

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const userDoc = await User.findOne({ username });
  if (userDoc) {
    console.log("Username Exists");
    jwt.sign({ username, id: userDoc._id }, secretKey, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong Username/Password");
  }
});

app.post("/addEmployee", async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getEmployees", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/getEmployee/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.json(employee);
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post("/updateEmployee/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, job_role, numberOfDaysLoggedIn } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        age,
        job_role,
        numberOfDaysLoggedIn,
      },
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
