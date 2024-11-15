import React from 'react';
import { Layout } from "@/app/layout";  // Import the layout you created
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const Dashboard = () => {
  return (
    <div className="flex ">
        
    <Layout children={undefined}/>
    

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between">
          <h1>Dashboard</h1>
          <Button>Nova Transação</Button>

        </div>
        <div className="flex justify-between gap-x-24">
          <Card className='bg-zinc-900 flex-1 shadow-lg p-2'>
            <CardHeader>
              <CardTitle className="text-lime-500">Entradas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl"><span className="text-sm">R$</span>700,00</p>
            </CardContent>
          </Card>

          <Card className='bg-zinc-900  flex-1  shadow-lg'>
            <CardHeader>
            <CardTitle className="text-red-500">Saidas</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl"><span className="text-sm">R$</span>700,00</p>
            </CardContent>

          </Card>

          <Card className='bg-zinc-900  flex-1  shadow-lg'>
            <CardHeader>
            <CardTitle className="text-blue-500">Balanço</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl"><span className="text-sm">R$</span>700,00</p>
            </CardContent>

          </Card>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
