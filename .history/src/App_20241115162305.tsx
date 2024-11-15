import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard'; // Import Dashboard component
import Entradas from './pages/entradas';   // Import Entradas component
import Saidas from './pages/saidas';       // Import Saidas component

export function App() {
  return (
    <Router>

      <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/in" element={<Entradas />} />
            <Route path="/out" element={<Saidas />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}