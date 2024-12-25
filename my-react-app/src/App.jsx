import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import AssistantTreasurerDashboard from './pages/AssistantTreasurerDashboard';
import PayrollAccountantDashboard from './pages/PayrollAccountantDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/roles" element={<RoleSelectionPage />} />
        <Route path="/dashboard/assistant-treasurer" element={<AssistantTreasurerDashboard />} />
        <Route path="/dashboard/payroll-accountant" element={<PayrollAccountantDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
