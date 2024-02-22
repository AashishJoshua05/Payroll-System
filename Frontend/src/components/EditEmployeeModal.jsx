const EditEmployeeModal = ({
  editedEmployee,
  handleChange,
  handleSave,
  handleClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 w-1/4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Edit Employee Details</h2>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={editedEmployee.name}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={editedEmployee.age}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <label>Job Role:</label>
        <input
          type="text"
          name="job_role"
          value={editedEmployee.job_role}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <label>Number of Days Logged In:</label>
        <input
          type="number"
          name="numberOfDaysLoggedIn"
          value={editedEmployee.numberOfDaysLoggedIn}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="mr-2 px-4 py-2 bg-cyan-100 hover:bg-cyan-400 rounded-md"
          >
            Save Changes
          </button>
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

export default EditEmployeeModal;