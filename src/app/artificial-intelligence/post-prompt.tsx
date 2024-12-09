import { api } from "@/lib/axios"; // Ensure this points to your axios instance

export async function sendPrompt(prompt: string): Promise<string> {
  try {
    const response = await api.post("/ai/complete", { prompt });
    return response.data; // Assuming `response.data` contains the AI output
  } catch (error) {
    console.error("Error sending prompt:", error);
    throw new Error("Failed to send prompt");
  }
}
