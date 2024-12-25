import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterSearchEdit from '../components/FilterSearchEdit';
import EmployeesTable from '../components/EmployeesTable';
import FilterPopup from '../components/FilterPopup'; // Import the FilterPopup component
import api from '../services/api';

const PayrollAccountantDashboard = () => {
  const [employees, setEmployees] = useState([]); // Employee data
  const [showPopup, setShowPopup] = useState(false); // State to toggle filter popup
  const [filters, setFilters] = useState({}); // State to store applied filters

  // Fetch employees based on filters
  const fetchEmployees = async (filters = {}) => {
    try {
      const response = Object.keys(filters).length
        ? await api.post('/api/payroll/employees/filter', filters) // Fetch filtered employees
        : await api.get('/api/payroll/employees'); // Fetch all employees if no filters
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleRemoveFilters = () => {
    setFilters({}); // Reset filters
    setShowPopup(false); // Close the popup
    fetchEmployees(); // Fetch all employees
  };
  

  useEffect(() => {
    // Fetch all employees initially
    fetchEmployees();
  }, []);

  // Toggle filter popup visibility
  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  // Apply filters and fetch filtered data
  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters); // Store applied filters in state
    setShowPopup(false); // Close popup
    fetchEmployees(appliedFilters); // Fetch filtered employees
  };

  return (
    <div>
      <Header
        onHomeClick={() => window.location.reload()}
        onSettingsClick={() => alert('Settings clicked')}
      />
      <FilterSearchEdit
        onFilterClick={togglePopup} // Open the filter popup
        onSearch={(term) => alert(`Search for ${term}`)}
        onEdit={() => alert('Edit clicked')}
      />
      <EmployeesTable
        employees={employees} // Pass filtered employee data to the table
        onAdditionalFieldsClick={(id) => alert(`Additional fields for employee ${id}`)}
      />
      {showPopup && (
        <FilterPopup
          onClose={togglePopup} // Close the popup
          onApplyFilters={handleApplyFilters} // Apply filters and fetch data
          onRemoveFilters={handleRemoveFilters}
        />
      )}
    </div>
  );
};

export default PayrollAccountantDashboard;
