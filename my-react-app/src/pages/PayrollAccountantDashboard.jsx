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

  // Fetch employees based on filters or search term
  const fetchEmployees = async (filters = {}, searchTerm = '') => {
    
    try {
      if (searchTerm) {
        // Search employees by term
        console.log("in Search Term");
        const response = await api.get(`/api/payroll/employees/search?term=${encodeURIComponent(searchTerm)}`);
        console.log("Search Response:"); 

        setEmployees(response.data);
      } else if (Object.keys(filters).length) {
        // Fetch filtered employees
        console.log("in Filters");
        const response = await api.post('/api/payroll/employees/filter', filters);
        setEmployees(response.data);
      } else {
        // Fetch all employees
        console.log("in All");
        const response = await api.get('/api/payroll/employees');
        setEmployees(response.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleRemoveFilters = () => {
    setFilters({}); // Reset filters
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

  // Handle search functionality
  const handleSearch = (term) => {
    fetchEmployees({}, term); // Fetch employees based on search term
  };

  return (
    <div>
      <Header
        onHomeClick={() => window.location.reload()}
        onSettingsClick={() => alert('Settings clicked')}
      />
      <FilterSearchEdit
        onFilterClick={togglePopup} // Open the filter popup
        onSearch={handleSearch} // Pass the search function
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
