import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction"; // Import shared type

// Custom hook for fetching transactions
export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      api
        .get("/transactions")
        .then((response) => {
          if (Array.isArray(response.data)) {
            setTransactions(response.data);
          } else {
            console.error("Invalid data format:", response.data);
            setError(new Error("Invalid data format received"));
          }
        })
        .catch((err) => {
          console.error("Error fetching transactions:", err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  
    return { transactions, loading, error };
  }