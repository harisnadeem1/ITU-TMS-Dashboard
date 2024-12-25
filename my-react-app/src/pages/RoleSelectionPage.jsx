import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RoleSelectionPage = () => {
  const roles = useSelector((state) => state.auth.roles);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === 'Assistant Treasurer') {
      navigate('/dashboard/assistant-treasurer');
    } else if (role === 'Payroll Accountant') {
      navigate('/dashboard/payroll-accountant');
    }
  };

  return (
    <div>
      <h1>Select Your Role</h1>
      <select onChange={(e) => handleRoleSelect(e.target.value)}>
        <option value="">Select a role</option>
        {roles.map((role, index) => (
          <option key={index} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSelectionPage;
