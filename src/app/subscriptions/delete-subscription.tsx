import { api } from "@/lib/axios";

export async function deleteSubscription(id: string) {
    try {
      await api.delete(`/subscriptions/${id}`);
      return true; // Indicate success
    } catch (error) {
      console.error("Error deleting subscription:", error);
      return false; // Indicate failure
    }
  }