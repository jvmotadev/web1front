import { api } from "@/lib/axios";

export interface TransactionData {
  id?: string; // Incluído o ID para identificar a transação a ser editada
  value: number;
  name: string;
  category: string;
  description?: string;
  type: "entrada" | "saida";
}

// Atualizar uma transação existente
export async function updateTransaction(id: string, transaction: TransactionData) {
  try {
    const response = await api.put(`/transactions/${id}`, transaction);
    return response.data; // Retorna a transação atualizada
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Failed to update transaction");
  }
}
