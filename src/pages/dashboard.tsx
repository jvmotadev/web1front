import { useState } from "react";
import { Layout } from "@/app/layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Transaction } from "@/app/transaction";
import { columns } from "@/app/transaction-list/columns";
import { DataTable } from "@/app/transaction-list/data-table";
import { TransactionList } from "@/app/transaction-list/transaction-list";
import { Transaction as TransactionType } from "@/types/transaction";
import { SummaryCards } from "@/app/cards/cards";

const Dashboard = () => {
  // Explicitly type the state to ensure TypeScript understands its structure
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  return (
    <div className="flex">
      <Layout children={undefined} />
      <main className="flex-1 flex-wrap pt-4 px-4 overflow-auto">
        <div className="flex justify-between px-10 pt-0">
          <h1 className="text-5xl">Dashboard</h1>
          <Dialog>
            <DialogTrigger className="text-xl">
              <span className="text-2xl text-lime-500">+</span> Nova Transação
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <Transaction />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-center gap-x-32 mt-6">
          <SummaryCards />
        </div>
        <div className="container mx-auto pt-6">
          {/* Fetch transactions dynamically */}
          <TransactionList onDataLoaded={setTransactions} />
          {/* Pass the transactions to the DataTable */}
          <DataTable columns={columns} data={transactions} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
