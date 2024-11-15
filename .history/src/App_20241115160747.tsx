import React from 'react';
import { Layout } from "./app/layout";  // Import the layout you created
import { Button } from "./components/ui/button";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
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