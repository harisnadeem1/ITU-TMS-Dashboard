import React, { useState } from 'react';

const FilterSearchEdit = ({ onFilterClick, onSearch, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <div>
        <button onClick={onFilterClick}>Filter</button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => onSearch(searchTerm)}>Search</button>
      </div>
      <div>
        <button onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

export default FilterSearchEdit;
