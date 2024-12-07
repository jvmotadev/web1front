import { useState } from "react";
import { Layout } from "@/app/layout";
import { createColumns } from "@/app/transaction-list/columns";
import { DataTable } from "@/app/transaction-list/data-table";
import { TransactionList } from "@/app/transaction-list/transaction-list";
import { Transaction as TransactionType } from "@/types/transaction";



const Entradas = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

   // Filter transactions for entries only
  const entries = transactions.filter((transaction) => transaction.type === "entrada");
  const columnsWithoutSelect = createColumns(false, false);


  return (
    <div className="flex ">
      <Layout children={undefined} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between gap-x-24">
          <h1 className="text-5xl">Entradas</h1>
        </div>
        <div className="container mx-auto pt-6">
          {/* Fetch transactions dynamically */}
          <TransactionList onDataLoaded={setTransactions} />
          {/* Pass the transactions to the DataTable */}
          <DataTable columns={columnsWithoutSelect} data={entries} pageSize={17} />
        </div>

      </main>
    </div>
  );
};

export default Entradas;
