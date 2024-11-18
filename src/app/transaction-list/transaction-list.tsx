import { api } from "@/lib/axios";
import { useEffect } from "react";
import { Transaction } from "@/types/transaction"; // Import shared type

interface TransactionListProps {
  onDataLoaded: (data: Transaction[]) => void;
}

export function TransactionList({ onDataLoaded }: TransactionListProps) {
  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => {
        console.log("API Response (raw):", response); // Log the full response
        console.log("API Response (data):", response.data); // Log the data part of the response

        if (Array.isArray(response.data)) {
          // Validate that the response data is an array
          console.log("Validated Response (as array):", response.data);
          onDataLoaded(response.data); // Pass data to parent
        } else {
          console.error(
            "API Response is not an array. Received:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [onDataLoaded]);

  return null; // This component only handles data fetching
}
