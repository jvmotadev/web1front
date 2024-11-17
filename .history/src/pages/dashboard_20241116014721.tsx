import React from 'react';
import { Layout } from "@/app/layout";  // Import the layout you created
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Transaction } from '@/components/add-transaction';


const Dashboard = () => {
  return (
    <div className="flex ">
        
    <Layout children={undefined}/>
    

      <main className="flex-wrap p-6 overflow-auto">
        <div className="flex justify-between">
          <h1 className="text-5xl">Dashboard</h1>
          <Dialog>
            <DialogTrigger className="text-xl"><span className="text-2xl text-lime-500">+</span> Nova Transação</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <Transaction/>
                </DialogHeader>
            </DialogContent>
          </Dialog>

        </div>
        <div className="flex justify-between gap-x-32 mt-6">
          <Card className='bg-zinc-900 flex-1 shadow-lg p-2 text-center'>
            <CardHeader>
              <CardTitle className="text-2xl text-lime-500">Entradas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl"><span className="text-sm">R$</span>700,00</p>
            </CardContent>
          </Card>

          <Card className='bg-zinc-900  flex-1  shadow-lg p-2 text-center'>
            <CardHeader>
            <CardTitle className="text-2xl text-red-500">Saidas</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl"><span className="text-sm">R$</span>700,00</p>
            </CardContent>

          </Card>

          <Card className='bg-zinc-900  flex-1  shadow-lg p-2 text-center'>
            <CardHeader>
            <CardTitle className="text-2xl text-blue-500">Balanço</CardTitle>
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
