import React from 'react';
import { Layout } from "@/app/layout";  // Import the layout you created
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';


const Dashboard = () => {
  return (
    <div className="flex ">
        
    <Layout children={undefined}/>
    

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between">
          <h1 className="text-5xl">Dashboard</h1>
          <Dialog>
            <DialogTrigger>Nova Transação</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
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
