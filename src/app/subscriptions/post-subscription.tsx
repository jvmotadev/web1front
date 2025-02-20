import { api } from "@/lib/axios";

export interface SubscriptionData {
  name: string;
  category: string;
  day: number;
  month?: number; // Optional for annual subscriptions
  value: number;
  frequency: string; // e.g., "mensal" or "anual"
}

export async function createSubscription(subscription: SubscriptionData) {
  try {
    const response = await api.post("/subscriptions", subscription);
    return response.data; // Return created subscription
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw new Error("Failed to create subscription");
  }
}
