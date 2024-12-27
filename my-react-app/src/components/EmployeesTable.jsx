import React, { useState } from "react";

const EmployeesTable = ({ employees, onAdditionalFieldsClick, onEdit }) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Handle checkbox selection for individual employees
  const handleCheckboxChange = (employeeId) => {
    const updatedSelectedEmployees = selectedEmployees.includes(employeeId)
      ? selectedEmployees.filter((id) => id !== employeeId)
      : [...selectedEmployees, employeeId];

    setSelectedEmployees(updatedSelectedEmployees);
    console.log("Updated Selected Employees:", updatedSelectedEmployees); // Log updated state
  };

  // Handle "Select All" functionality
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = employees.map((employee) => employee.id);
      setSelectedEmployees(allIds);
      console.log("All Selected Employees:", allIds); // Log selected IDs
    } else {
      setSelectedEmployees([]);
      console.log("All Selections Cleared"); // Log cleared state
    }
  };

  return (
    <div>
      {/* Edit Button */}
      <button
        onClick={() => {
          console.log("Employees Selected for Editing:", selectedEmployees);
          onEdit(selectedEmployees);
        }}
        disabled={selectedEmployees.length === 0}
        style={{
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: selectedEmployees.length > 0 ? "#007bff" : "#d3d3d3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: selectedEmployees.length === 0 ? "not-allowed" : "pointer",
        }}
      >
        Edit
      </button>

      {/* Scrollable Table Container */}
      <div
        style={{
          overflowX: "auto", // Enable horizontal scrolling
          whiteSpace: "nowrap", // Prevent table from wrapping
        }}
      >
        {/* Employee Table */}
        <table border="1" style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    employees.length > 0 &&
                    selectedEmployees.length === employees.length
                  }
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Bank Account No.</th>
              <th>Branch Code</th>
              <th>Branch Name</th>
              <th>CNIC</th>
              <th>Designation</th>
              <th>Category</th>
              <th>Scale</th>
              <th>Appointment Date</th>
              <th>Contract End Date</th>
              <th>Mode of Payment</th>
              <th>No of Days Paid</th>
              <th>Increment</th>
              <th>Basic Pay</th>
              <th>Running Basic Pay</th>
              <th>Monthly Pay</th>
              <th>Arrears</th>
              <th>Other Deductions</th>
              <th>Gross Payable</th>
              <th>Income Tax</th>
              <th>Previous Month's Net Pay</th>
              <th>Net Pay</th>
              <th>Remarks</th>
              <th>Additional Fields</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleCheckboxChange(employee.id)}
                  />
                </td>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.bank_account_no}</td>
                <td>{employee.branch_code}</td>
                <td>{employee.branch_name}</td>
                <td>{employee.cnic}</td>
                <td>{employee.designation}</td>
                <td>{employee.category}</td>
                <td>{employee.scale}</td>
                <td>{employee.appointment_date}</td>
                <td>{employee.contract_end_date}</td>
                <td>{employee.mode_of_payment}</td>
                <td>{employee.no_of_days_paid}</td>
                <td>{employee.increment}</td>
                <td>{employee.basic_pay}</td>
                <td>{employee.running_basic_pay}</td>
                <td>{employee.monthly_pay}</td>
                <td>{employee.arrears}</td>
                <td>{employee.other_deductions}</td>
                <td>{employee.gross_payable}</td>
                <td>{employee.income_tax}</td>
                <td>{employee.previous_month_net_pay}</td>
                <td>{employee.net_pay}</td>
                <td>{employee.remarks}</td>
                <td>
                  <button
                    onClick={() => onAdditionalFieldsClick(employee.id)}
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTable;
