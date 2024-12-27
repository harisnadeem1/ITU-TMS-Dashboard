import React, { useState } from "react";

const EditEmployeesModal = ({ employees, onSubmit, onClose }) => {
  const [editedEmployees, setEditedEmployees] = useState(
    employees.map((employee) => ({
      ...employee,
      branch_name: employee.branch_name || "",
      branch_code: employee.branch_code || "",
      account_number: employee.account_number || "",
    }))
  );

  const handleInputChange = (id, field, value) => {
    setEditedEmployees((prev) =>
      prev.map((employee) =>
        employee.id === id ? { ...employee, [field]: value } : employee
      )
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "800px",
          width: "90%",
          maxHeight: "90%",
          overflow: "auto",
        }}
      >
        <h2>Edit Employees</h2>
        <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Branch Name</th>
              <th>Branch Code</th>
              <th>Account Number</th>
            </tr>
          </thead>
          <tbody>
            {editedEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>
                  <input
                    type="text"
                    value={employee.branch_name}
                    onChange={(e) =>
                      handleInputChange(employee.id, "branch_name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={employee.branch_code}
                    onChange={(e) =>
                      handleInputChange(employee.id, "branch_code", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={employee.account_number}
                    onChange={(e) =>
                      handleInputChange(employee.id, "account_number", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => onSubmit(editedEmployees)}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditEmployeesModal;
