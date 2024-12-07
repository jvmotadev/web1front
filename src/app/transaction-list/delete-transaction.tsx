import { api } from "@/lib/axios";

export const deleteTransaction = async (id: string): Promise<void> => {
  try {
    await api.delete(`/transactions/${id}`);
    console.log(`Transaction with id ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting transaction with id ${id}`, error);
    throw error; // Re-throw the error if you want to handle it further up
  }
};
