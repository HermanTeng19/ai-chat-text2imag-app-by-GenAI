import { GoogleGenerativeAI } from "@google/generative-ai";
import { storage } from './firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

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
 * Calls the Gemini 2.0 Flash Preview API to generate an image from a prompt, uploads to Firebase Storage, and returns the download URL.
 * @param prompt - The user's image prompt.
 * @param userId - The current user's UID (for storage path).
 * @returns Image download URL string.
 */
export async function getImageFromPrompt(prompt: string, userId?: string | null): Promise<string> {
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
      // Upload to Firebase Storage and return download URL
      const base64Image = `data:image/png;base64,${imagePart.inlineData.data}`;
      if (!userId) return '[Error: User not authenticated for image upload]';
      const imageRef = ref(storage, `user-images/${userId}/${Date.now()}.png`);
      await uploadString(imageRef, base64Image, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    }
    return '[Error: No image data returned from Gemini API]';
  } catch (err) {
    return `[Gemini Image API error: ${err instanceof Error ? err.message : String(err)}]`;
  }
} 