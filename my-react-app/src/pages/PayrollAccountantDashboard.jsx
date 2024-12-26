import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FilterSearchEdit from "../components/FilterSearchEdit";
import EmployeesTable from "../components/EmployeesTable";
import FilterPopup from "../components/FilterPopup";
import AdditionalFieldsModal from "../components/AdditionalFieldsModal";
import api from "../services/api";

const PayrollAccountantDashboard = () => {
  const [employees, setEmployees] = useState([]); // Employee data
  const [showPopup, setShowPopup] = useState(false); // State to toggle filter popup
  const [filters, setFilters] = useState({}); // State to store applied filters
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Currently selected employee
  const [additionalFields, setAdditionalFields] = useState(null); // Additional fields for the selected employee
  const [showModal, setShowModal] = useState(false); // State to toggle additional fields modal

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
      console.log(response);

      setSelectedEmployee(response.data.employee);
      setAdditionalFields(response.data.additional_fields);
      setShowModal(true); // Show the modal
      console.log("Model set as true");
    } catch (error) {
      console.error("Error fetching additional fields:", error);
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
        onEdit={() => alert("Edit clicked")}
      />
      <EmployeesTable
        employees={employees}
        onAdditionalFieldsClick={fetchAdditionalFields}
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
    </div>
  );
};

export default PayrollAccountantDashboard;
