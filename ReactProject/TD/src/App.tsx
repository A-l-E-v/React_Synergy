import React from 'react';
import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Изменено с Switch на Routes
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import ActiveSprint from './components/ActiveSprint/ActiveSprint';
import AdminPanel from './components/AdminPanel/AdminPanel';


const App: React.FC = () => {
    return (
      
        <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/active-sprint" element={<ActiveSprint />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Routes>
      </Router>
    );
};

export default App;
