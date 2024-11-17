import React from 'react';
import { Layout } from "@/app/layout";  // Import the layout you created
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Transaction } from '@/app/transaction';
import { columns } from '@/app/transaction-list/columns';
import { DataTable } from '@/app/transaction-list/data-table';
import { staticPayments } from '@/app/transaction-list/static-data';
import { SummaryCards } from '@/app/cards';


const Dashboard = () => {
  return (
    <div className="flex">
        
    <Layout children={undefined}/>
    

      <main className="flex-1 flex-wrap p-6 overflow-auto">
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
        <div className="flex justify-center gap-x-32 mt-6">
          <SummaryCards />

        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={staticPayments} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
