import React, { useState } from 'react';

const FilterPopup = ({ onClose, onApplyFilters, onRemoveFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category
  const [filters, setFilters] = useState({
    department: '',
    staff: '',
    designation: '',
    office: '',
  });

  // Handle field change
  const handleFieldChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFilters({
      department: '',
      staff: '',
      designation: '',
      office: '',
    });
  };

  // Handle removing filters
  const handleRemoveFilters = () => {
    setSelectedCategory('');
    setFilters({
      department: '',
      staff: '',
      designation: '',
      office: '',
    });
    onRemoveFilters(); // Call the parent function to reset filters
  };

  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '20px', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '5px', maxWidth: '800px', margin: 'auto', display: 'flex', position: 'relative' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '5px 10px',
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>

        {/* Left Sidebar */}
        <div style={{ flex: 1, borderRight: '1px solid #ddd', padding: '10px' }}>
          <h3>Categories</h3>
          {['TTS Staff', 'TTS Support Staff', 'Support Staff', 'School Staff RA'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              style={{
                display: 'block',
                padding: '10px',
                margin: '5px 0',
                background: selectedCategory === category ? '#007bff' : '#f8f9fa',
                color: selectedCategory === category ? '#fff' : '#000',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Right Options Panel */}
        <div style={{ flex: 2, padding: '10px' }}>
          <h3>Filter Options</h3>
          {selectedCategory === 'TTS Staff' && (
            <>
              <div>
                <label>Department:</label>
                <select onChange={(e) => handleFieldChange('department', e.target.value)}>
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
              </div>
              <div>
                <label>Staff:</label>
                <select onChange={(e) => handleFieldChange('staff', e.target.value)}>
                  <option value="">Select Staff</option>
                  <option value="Tenure Track Staff">Tenure Track Staff</option>
                  <option value="Teaching Staff">Teaching Staff</option>
                </select>
              </div>
              <div>
                <label>Designation:</label>
                <select onChange={(e) => handleFieldChange('designation', e.target.value)}>
                  <option value="">Select Designation</option>
                  {filters.staff === 'Teaching Staff' ? (
                    <option value="Teaching Fellow">Teaching Fellow</option>
                  ) : (
                    <>
                      <option value="Professor">Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                    </>
                  )}
                </select>
              </div>
            </>
          )}
          {selectedCategory === 'TTS Support Staff' && (
            <>
              <div>
                <label>Department:</label>
                <select onChange={(e) => handleFieldChange('department', e.target.value)}>
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
              </div>
              <div>
                <label>Staff:</label>
                <select onChange={(e) => handleFieldChange('staff', e.target.value)}>
                  <option value="">Select Staff</option>
                  <option value="Program Office">Program Office</option>
                  <option value="Lab Administrator">Lab Administrator</option>
                </select>
              </div>
            </>
          )}
          {selectedCategory === 'Support Staff' && (
            <>
              <div>
                <label>Office:</label>
                <select onChange={(e) => handleFieldChange('office', e.target.value)}>
                  <option value="">Select Office</option>
                  <option value="Vice Chancellor Office">Vice Chancellor Office</option>
                  <option value="Registrar Office">Registrar Office</option>
                </select>
              </div>
              <div>
                <label>Staff:</label>
                <select onChange={(e) => handleFieldChange('staff', e.target.value)}>
                  <option value="">Select Staff</option>
                  <option value="Administrative Staff">Administrative Staff</option>
                </select>
              </div>
            </>
          )}
          {selectedCategory === 'School Staff RA' && (
            <>
              <div>
                <label>Department:</label>
                <select onChange={(e) => handleFieldChange('department', e.target.value)}>
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
              </div>
              <div>
                <label>Staff:</label>
                <select onChange={(e) => handleFieldChange('staff', e.target.value)}>
                  <option value="">Select Staff</option>
                  <option value="Research and Development Staff">Research and Development Staff</option>
                </select>
              </div>
            </>
          )}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onApplyFilters({ category: selectedCategory, ...filters })}
              style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              Apply Filters
            </button>
            <button
              onClick={handleRemoveFilters}
              style={{ padding: '10px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              Remove Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
