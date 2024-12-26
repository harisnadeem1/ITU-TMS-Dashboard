import React, { useState } from 'react';

const FilterSearchEdit = ({ onFilterClick, onSearch, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm); // Pass the search term to the parent component
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <div>
        <button onClick={onFilterClick}>Filter</button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '5px',
            marginLeft: '10px',
            marginRight: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '5px 10px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Search
        </button>
      </div>
      <div>
        <button
          onClick={onEdit}
          style={{
            padding: '5px 10px',
            background: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default FilterSearchEdit;
