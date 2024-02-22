import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SalarySplit = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:4000/getEmployee/${employeeId}`);
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const calculateSalarySplit = (numberOfDaysLoggedIn) => {
    const baseSalary = 2000;
    const perDaySalary = 100;
    const taxRate = 0.2;

    let totalSalary = baseSalary + numberOfDaysLoggedIn * perDaySalary;
    const taxAmount = totalSalary * taxRate;
    const netSalary = totalSalary - taxAmount;

    return {
      totalSalary,
      taxAmount,
      netSalary,
    };
  };

  return (
    <div>
      {employee ? (
        <div>
          <h1>{employee.name}'s Salary Split</h1>
          <p>Job Role: {employee.job_role}</p>
          <p>Days Logged In: {employee.numberOfDaysLoggedIn}</p>
          <p>Payslip: {JSON.stringify(calculateSalarySplit(employee.numberOfDaysLoggedIn))}</p>
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default SalarySplit;
