import React from 'react';
import { Layout } from "./app/layout";  // Import the layout you created
import { Button } from "./components/ui/button";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Router>
      <Layout>
        <div style={{ padding: '20px' }}>
          <h1>Hello from the Main Content!</h1>
          <Button>Hello World</Button>
        </div>
      </Layout>
{/*       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes> */}
    </Router>

  )
}