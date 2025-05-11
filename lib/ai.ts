import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Calls the Gemini API to get an AI response for a given prompt.
 * @param prompt - The user's message.
 * @returns AI response string from Gemini.
 */
export async function getAIResponse(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return "[Error: Gemini API key is missing. Set NEXT_PUBLIC_GEMINI_API_KEY in your .env file.]";
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    return `[Gemini API error: ${err instanceof Error ? err.message : String(err)}]`;
  }
} 