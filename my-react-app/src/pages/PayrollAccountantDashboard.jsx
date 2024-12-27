import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FilterSearchEdit from "../components/FilterSearchEdit";
import EmployeesTable from "../components/EmployeesTable";
import FilterPopup from "../components/FilterPopup";
import AdditionalFieldsModal from "../components/AdditionalFieldsModal";
import EditEmployeesModal from "../components/EditEmployeesModal"; // Import the Edit Modal
import api from "../services/api";

const PayrollAccountantDashboard = () => {
  const [employees, setEmployees] = useState([]); // Employee data
  const [showPopup, setShowPopup] = useState(false); // State to toggle filter popup
  const [filters, setFilters] = useState({}); // State to store applied filters
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Currently selected employee
  const [additionalFields, setAdditionalFields] = useState(null); // Additional fields for the selected employee
  const [showModal, setShowModal] = useState(false); // State to toggle additional fields modal
  const [showEditModal, setShowEditModal] = useState(false); // State to toggle edit modal
  const [employeesToEdit, setEmployeesToEdit] = useState([]); // Employees to be edited

  // Fetch employees based on filters or search term
  const fetchEmployees = async (filters = {}, searchTerm = "") => {
    try {
      if (searchTerm) {
        console.log("Fetching employees by search term...");
        const response = await api.get(
          `/api/payroll/employees/search/${encodeURIComponent(searchTerm)}`
        );
        setEmployees(response.data);
      } else if (Object.keys(filters).length) {
        console.log("Fetching filtered employees...");
        const response = await api.post("/api/payroll/employees/filter", filters);
        setEmployees(response.data);
      } else {
        console.log("Fetching all employees...");
        const response = await api.get("/api/payroll/employees");
        setEmployees(response.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleRemoveFilters = () => {
    setFilters({});
    fetchEmployees(); // Fetch all employees
  };

  useEffect(() => {
    // Fetch all employees on component mount
    fetchEmployees();
  }, []);

  // Toggle filter popup visibility
  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  // Apply filters and fetch filtered data
  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    setShowPopup(false); // Close popup
    fetchEmployees(appliedFilters);
  };

  // Handle search functionality
  const handleSearch = (term) => {
    fetchEmployees({}, term); // Fetch employees based on search term
  };

  // Fetch additional fields for a specific employee
  const fetchAdditionalFields = async (employeeId) => {
    console.log(employeeId);
    try {
      console.log(`Fetching additional fields for employee ID: ${employeeId}`);
      const response = await api.get(`/api/payroll/employees/${employeeId}/additional-fields`);
      setSelectedEmployee(response.data.employee);
      setAdditionalFields(response.data.additional_fields);
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error("Error fetching additional fields:", error);
    }
  };

  // Handle edit functionality
  const handleEdit = (selectedIds) => {
    if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
      console.error("No employees selected for editing.");
      return;
    }
  
    const selected = employees.filter((emp) => selectedIds.includes(emp.id));
    setEmployeesToEdit(selected);
    setShowEditModal(true);
  };
  

  // Handle submit edit changes
  const handleSubmitEdit = async (editedEmployees) => {
    try {
      await api.post("/api/payroll/employees/update", { employees: editedEmployees });
      setShowEditModal(false);
      fetchEmployees(); // Refresh data after edit
    } catch (error) {
      console.error("Error updating employees:", error);
    }
  };

  return (
    <div>
      <Header
        onHomeClick={() => window.location.reload()}
        onSettingsClick={() => alert("Settings clicked")}
      />
      <FilterSearchEdit
        onFilterClick={togglePopup}
        onSearch={handleSearch}
        onEdit={handleEdit}
      />
      <EmployeesTable
        employees={employees}
        onAdditionalFieldsClick={fetchAdditionalFields}
        onEdit={handleEdit}
      />
      {showPopup && (
        <FilterPopup
          onClose={togglePopup}
          onApplyFilters={handleApplyFilters}
          onRemoveFilters={handleRemoveFilters}
        />
      )}
      {showModal && selectedEmployee && additionalFields && (
        <AdditionalFieldsModal
          employee={selectedEmployee}
          fields={additionalFields}
          onClose={() => setShowModal(false)}
        />
      )}
      {showEditModal && (
        <EditEmployeesModal
          employees={employeesToEdit}
          onSubmit={handleSubmitEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default PayrollAccountantDashboard;
