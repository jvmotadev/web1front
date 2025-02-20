import { api } from "@/lib/axios";

export async function fetchSubscriptions() {
  try {
    const response = await api.get("/subscriptions");
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("API Response is not an array", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
}