import React from "react";

const AdditionalFieldsModal = ({ employee, fields, onClose }) => (
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
        maxWidth: "500px",
        width: "90%",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Additional Fields for {employee.name} ({employee.category})
      </h2>
      <button
        onClick={onClose}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        Close
      </button>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f2f2f2",
                fontWeight: "bold",
              }}
            >
              Field Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f2f2f2",
                fontWeight: "bold",
              }}
            >
              Field Value
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(fields).map(([key, value]) => (
            <tr key={key}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                {key.replace(/_/g, " ")}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                {value || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdditionalFieldsModal;
