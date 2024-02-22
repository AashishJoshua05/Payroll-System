import React, { useState, useEffect } from "react";
import EditEmployeeModal from "../components/EditEmployeeModal";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editedEmployee, setEditedEmployee] = useState({
    _id: "",
    name: "",
    age: 0,
    job_role: "",
    numberOfDaysLoggedIn: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/getEmployees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  const handleEdit = (employee) => {
    // Set the employee data to the state for editing
    setEditedEmployee({
      _id: employee._id,
      name: employee.name,
      age: employee.age,
      job_role: employee.job_role,
      numberOfDaysLoggedIn: employee.numberOfDaysLoggedIn,
    });

    // Show the modal
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      // Send a POST request to update the employee details
      await fetch(
        `http://localhost:4000/updateEmployee/${editedEmployee._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editedEmployee.name,
            age: editedEmployee.age,
            job_role: editedEmployee.job_role,
            numberOfDaysLoggedIn: editedEmployee.numberOfDaysLoggedIn,
          }),
        }
      );

      // Fetch updated data after the save operation
      const response = await fetch("http://localhost:4000/getEmployees");
      const data = await response.json();
      setEmployees(data);

      // Clear the editedEmployee state
      setEditedEmployee({
        _id: "",
        name: "",
        age: 0,
        job_role: "",
        numberOfDaysLoggedIn: 0,
      });

      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Error updating employee details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevData) => ({
      ...prevData,
      [name]:
        name === "age" || name === "numberOfDaysLoggedIn"
          ? parseInt(value)
          : value,
    }));
  };

  const handleClose = () => {
    // Close the modal without saving changes
    setShowModal(false);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="font-bold text-3xl">Employee List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col w-1/2">
          <ul className="flex flex-col space-y-8">
            {employees.map((employee, index) => (
              <li
                key={employee._id}
                className="flex justify-between items-center p-2 border border-gray-600"
              >
                <h3>{employee.name}</h3>
                <h3>{employee.job_role}</h3>
                <button onClick={() => handleEdit(employee)} className="px-4 py-2 bg-cyan-100 hover:bg-cyan-400 rounded-md">Edit</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showModal && (
        <EditEmployeeModal
          editedEmployee={editedEmployee}
          handleChange={handleChange}
          handleSave={handleSave}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default EmployeeList;
