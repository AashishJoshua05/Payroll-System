import dates from "../assets/Dates";


const CheckSalaryModal = ({ employee, handleClose }) => {
  const calculateSalarySplit = (numberOfDaysLoggedIn) => {
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const currentDate = new Date();
    const currentMonth = month[currentDate.getMonth()];
    // Access the total days using the 'dates' object
    const totalDays = dates[currentMonth]?.days;
    
    const baseSalary = 2000;
    const perDaySalary = 100;
    const taxRate = 0.2;
    if(numberOfDaysLoggedIn>totalDays){
      numberOfDaysLoggedIn = totalDays
    };
    let missedDays = totalDays - numberOfDaysLoggedIn;
    let totalSalary = baseSalary + (numberOfDaysLoggedIn * perDaySalary) - (missedDays * perDaySalary);
    const taxAmount = totalSalary * taxRate;
    const netSalary = totalSalary - taxAmount;

    return {
      totalSalary,
      taxAmount,
      netSalary,
      missedDays
    };
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 w-1/4 rounded-md">
        <h2 className="text-xl font-bold mb-4">
          {employee.name}'s Salary Split
        </h2>
        <p>Job Role: {employee.job_role}</p>
        <p>Days Logged In: {employee.numberOfDaysLoggedIn}</p>
        <div className="mb-4">
          <p>Payslip:</p>
          <pre className="p-2 border border-gray-300 rounded-md">
            {JSON.stringify(
              calculateSalarySplit(employee.numberOfDaysLoggedIn),
              null,
              2
            )}
          </pre>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-400 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckSalaryModal;
