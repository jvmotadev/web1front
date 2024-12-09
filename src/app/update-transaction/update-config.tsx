import { useState } from "react";
import { updateTransaction, TransactionData } from "./put-config";

export function useEditTransactionForm(existingTransaction: TransactionData) {
  const [formData, setFormData] = useState<TransactionData>(existingTransaction);

  const handleInputChange = (id: keyof TransactionData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.id) {
        throw new Error("ID da transação não encontrado");
      }
      const updatedTransaction = await updateTransaction(formData.id, formData);
      alert("Transação atualizada com sucesso!");
      window.location.reload(); // Recarregar a página para refletir a exclusão
      return updatedTransaction;
    } catch (error) {
      alert("Erro ao salvar as alterações. Tente novamente.");
      console.error(error);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  };
}
