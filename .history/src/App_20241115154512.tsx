import React from 'react';
import { Layout } from "./app/layout";  // Import the layout you created
import { Button } from "./components/ui/button";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';

export function App() {
  return (
    <Router>
      <div className="flex ">
        
        <Layout children={undefined}/>
        

          <main className="flex-1 p-6 overflow-auto">
            <div className="flex justify-between">
              <Card className='bg-zinc-900 shadow-lg'>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>

              <Card className='bg-zinc-900 shadow-lg'>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>

              <Card className='bg-zinc-900 shadow-lg'>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </div>
            <div className="flex justify-between">
              <h1>Hello from the Main Contenttttttttttttttttttt!</h1>
              <Button>Hello World</Button>

            </div>
          </main>
      </div>
      {/*       <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/in" element={<Entradas />} />
        <Route path="/out" element={<Saidas />} />
      </Routes> */}
    </Router>
  );
}