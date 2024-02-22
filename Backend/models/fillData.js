const mongoose = require("mongoose");
const Employee = require("./Employee");
mongoose.connect(
  "mongodb+srv://BlogWeb:SZRgmi5Lj8f1dINi@cluster0.ousdupv.mongodb.net/?retryWrites=true&w=majority"
);

//  rAVI KUMAR - 28 - DATA ANALYST
// fUNK FUNK WANGDU - 32 - Engineer
// Chota Bheem - 22 - Frontend intern
// Zaina Ahmed - 26 - HR
// Gagandeep - 37 - Product Manager

async function addData(dataArray) {
    try {
      const userDocs = await Employee.insertMany(dataArray);
      console.log("Data added successfully:", userDocs);
    } catch (e) {
      console.log("Error adding data:", e);
    }
  }
  
  const data = [
    { name: "Ravi Kumar", age: 28, job_role: "Data Analyst", numberOfDaysLoggedIn: 30, totalDaysinTheMonth: 30 },
    { name: "Vincent Fabron", age: 29, job_role: "Business Analyst", numberOfDaysLoggedIn: 27, totalDaysinTheMonth: 30 },
    { name: "Zania Ahmed", age: 27, job_role: "Human Resource", numberOfDaysLoggedIn: 28, totalDaysinTheMonth: 30 },
    { name: "Kautilya Bhatt", age: 26, job_role: "Frontend Intern", numberOfDaysLoggedIn: 30, totalDaysinTheMonth: 30 },
];
  
  addData(data);
  