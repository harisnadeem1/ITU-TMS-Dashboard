import React from 'react';

const Header = ({ onHomeClick, onSettingsClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f8f9fa' }}>
      <div>ITU TMS</div>
      <div>
        <button onClick={onHomeClick}>Home</button>
      </div>
      <div>
        <button onClick={onSettingsClick}>Settings</button>
      </div>
    </div>
  );
};

export default Header;
