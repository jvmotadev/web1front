import { useState } from "react";
import { createTransaction, TransactionData } from "./post-config";

export function useTransactionForm(defaultType: "entrada" | "saida") {
  const [formData, setFormData] = useState<TransactionData>({
    value: 0,
    name: "",
    category: "",
    description: "",
    type: defaultType,
  });

  const handleInputChange = (id: keyof TransactionData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        value: parseFloat(String(formData.value)),
      };
      const createdTransaction = await createTransaction(payload);
      alert("Transação registrada com sucesso!");
      window.location.reload(); // Recarregar a página para refletir a exclusão
      setFormData({ ...formData, name: "", value: 0, category: "", description: "" });
      return createdTransaction;
    } catch (error) {
      alert("Erro ao salvar a transação. Tente novamente.");
    }
  };

  return {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  };
}
