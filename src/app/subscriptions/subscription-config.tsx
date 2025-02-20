import { useState } from "react";
import { createSubscription, SubscriptionData } from "./post-subscription";

export function useSubscriptionForm() {
  const [formData, setFormData] = useState<SubscriptionData>({
    name: "",
    category: "",
    day: 1,
    month: undefined,  // or 0 if you prefer a numeric placeholder
    value: 0,
    frequency: "mensal",
  });

  const handleInputChange = (id: keyof SubscriptionData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        // Convert any string-based decimal to a float
        value: parseFloat(String(formData.value)),
      };
      const createdSubscription = await createSubscription(payload);

      alert("Assinatura registrada com sucesso!");
      // Optional: refresh or clear state
      window.location.reload();
      return createdSubscription;
    } catch (error) {
      alert("Erro ao salvar a assinatura. Tente novamente.");
    }
  };

  return {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  };
}
