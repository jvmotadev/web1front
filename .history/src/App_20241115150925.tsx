import React from 'react';
import { Layout } from "./app/layout";  // Import the layout you created
import { Button } from "./components/ui/button";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Router>
      <Layout>
        <div className='flex flex-1'>
          <h1>Hello from the Main Contenttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt!</h1>
          <Button>Hello World</Button>
        </div>
      </Layout>
{/*       <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/in" element={<Entradas />} />
        <Route path="/out" element={<Saidas />} />
      </Routes> */}
    </Router>

  )
}