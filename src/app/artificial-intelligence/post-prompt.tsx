import axios from "axios";

export async function sendPrompt(prompt: string, onData: (chunk: string) => void): Promise<void> {
  try {
    const response = await axios.post(
      "http://localhost:3333/ai/complete",
      { prompt },
      {
        responseType: "stream", // Request raw response as a stream
      }
    );

    const stream = response.data; // Access the stream directly

    // Listen for data chunks
    stream.on("data", (chunk: Buffer) => {
      const data = chunk.toString("utf8");
      onData(data); // Pass the chunk data to the callback
    });

    // Handle the end of the stream
    stream.on("end", () => {
      console.log("Stream finished");
    });

    // Handle stream errors
    stream.on("error", (error: any) => {
      console.error("Stream error:", error);
      throw error;
    });
  } catch (error) {
    console.error("Error sending prompt:", error);
    throw new Error("Failed to send prompt");
  }
}
