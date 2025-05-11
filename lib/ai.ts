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

/**
 * Calls the Gemini 2.0 Flash Preview API to generate an image from a prompt.
 * @param prompt - The user's image prompt.
 * @returns Image data URL string.
 */
export async function getImageFromPrompt(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return "[Error: Gemini API key is missing. Set NEXT_PUBLIC_GEMINI_API_KEY in your .env file.]";
  }
  try {
    // Use fetch to call the Gemini API directly for image generation
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ["Text", "Image"] }
        })
      }
    );
    const data = await response.json();
    // Find the first part with inlineData (the image)
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((part: any) => part.inlineData && part.inlineData.data);
    if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
      // Return as data URL
      return `data:image/png;base64,${imagePart.inlineData.data}`;
    }
    return '[Error: No image data returned from Gemini API]';
  } catch (err) {
    return `[Gemini Image API error: ${err instanceof Error ? err.message : String(err)}]`;
  }
} 