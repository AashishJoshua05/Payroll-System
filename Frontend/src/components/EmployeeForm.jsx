import React, { useState } from "react";
import axios from "axios";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    job_role: "",
    numberOfDaysLoggedIn: "",
    totalDaysinTheMonth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend to add a new employee
      const response = await axios.post(
        "http://localhost:4000/addEmployee",
        formData
      );
      // Clear the form after successful submission
      setFormData({
        name: "",
        age: "",
        job_role: "",
        numberOfDaysLoggedIn: "",
        totalDaysinTheMonth: "",
      });
      alert("Employee Added Successfully!")
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-bold text-3xl">Add Employee</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-amber-400 text-xl p-8 mt-8"
      >
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-amber-400"
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="border border-amber-400"
        />

        <label>Job Role:</label>
        <input
          type="text"
          name="job_role"
          value={formData.job_role}
          onChange={handleChange}
          required
          className="border border-amber-400"
        />

        <label>Number of Days Logged In:</label>
        <input
          type="number"
          name="numberOfDaysLoggedIn"
          value={formData.numberOfDaysLoggedIn}
          onChange={handleChange}
          required
          className="border border-amber-400"
        />

        <label>Total Days in the Month:</label>
        <input
          type="number"
          name="totalDaysinTheMonth"
          value={formData.totalDaysinTheMonth}
          onChange={handleChange}
          required
          className="border border-amber-400"
        />

        <button
          type="submit"
          className="px-4 py-2 mt-4 rounded-md bg-emerald-500 hover:bg-emerald-700"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
