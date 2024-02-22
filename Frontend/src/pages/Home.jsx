import React, { useState, useEffect } from "react";
import CheckSalaryModal from "../components/CheckSalaryModal";
import EditEmployeeModal from "../components/EditEmployeeModal";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/getEmployees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckSalary = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseSalaryModal = () => {
    setSelectedEmployee(null);
  };

  const handleEditEmployee = (employee) => {
    setEditedEmployee(employee);
  };

  const handleChangeEmployee = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevData) => ({
      ...prevData,
      [name]:
        name === "age" || name === "numberOfDaysLoggedIn"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSaveEmployee = async () => {
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
      setEditedEmployee(null);
    } catch (error) {
      console.error("Error updating employee details:", error);
    }
  };

  const handleCloseEditModal = () => {
    setEditedEmployee(null);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="font-bold text-3xl">Employee List</h1>
      <ul className="flex flex-col space-y-4 w-1/2 list-disc">
        {employees.map((employee, index) => (
          <li
            key={employee._id}
            className="flex justify-between items-center p-2 border border-gray-600"
          >
            <div className="flex items-center">
              <h3>{employee.name} - {employee.job_role}</h3>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleCheckSalary(employee)}
                className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-700"
              >
                Check Salary
              </button>
              <button
                onClick={() => handleEditEmployee(employee)}
                className="px-4 py-2 rounded-md bg-cyan-100 hover:bg-cyan-400"
              >
                Edit Employee
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedEmployee && (
        <CheckSalaryModal
          employee={selectedEmployee}
          handleClose={handleCloseSalaryModal}
        />
      )}

      {editedEmployee && (
        <EditEmployeeModal
          editedEmployee={editedEmployee}
          handleChange={handleChangeEmployee}
          handleSave={handleSaveEmployee}
          handleClose={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default Home;
