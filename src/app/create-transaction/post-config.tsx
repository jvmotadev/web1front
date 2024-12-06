import { api } from "@/lib/axios"; // Ensure this points to your axios instance

export interface TransactionData {
  value: number;
  name: string;
  category: string;
  description?: string;
  type: "entrada" | "saida";
}

export async function createTransaction(transaction: TransactionData) {
  try {
    const response = await api.post("/transactions", transaction);
    return response.data; // Return created transaction
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error("Failed to create transaction");
  }
}
