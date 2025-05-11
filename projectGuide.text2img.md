## 1. **Feature Overview**

**Goal:**  
Allow users to enter a prompt (e.g., “A cat riding a skateboard in space”), and the AI returns a generated image based on that prompt, which is then displayed in the chat.

---

## 2. **Structural Prompt for the AI Model**

When sending a request to a text-to-image model (like Gemini, DALL·E, or Stable Diffusion), you want to be clear and explicit about the output format. Here’s a **structured prompt** you can use:

---

### **System Instruction (for the AI model):**
```
You are an AI assistant that generates images from text prompts. When a user provides a prompt, return only a direct image URL or a base64-encoded image, and nothing else. Do not include any explanation or extra text.
```

### **User Prompt Example:**
```
Prompt: A futuristic city skyline at sunset, with flying cars and neon lights.
```

### **Expected Model Output:**
```
https://your-image-api.com/generated/abc123.png
```
or (if using base64):
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
```

---

## 3. **Chat App Integration Structure**

**a. Message Type Update**
```ts
// types/message.ts
export type Message = {
  id?: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: number;
  type?: 'text' | 'image'; // Add this field
  imageUrl?: string;       // For AI image responses
};
```

**b. UI/UX Flow**
- User enters a prompt and selects “Generate Image” (or types a special command, e.g., `/image ...`).
- The prompt is sent to the AI image generation API.
- The AI returns an image URL or base64 string.
- The chat displays the image in a message bubble, with the prompt as a caption.

**c. Example Chat Message Rendering**
```tsx
// In ChatMessage component
if (message.type === 'image' && message.imageUrl) {
  return (
    <div>
      <img src={message.imageUrl} alt={message.content} className="rounded-lg shadow-md max-w-xs" />
      <div className="text-xs text-gray-500 mt-1">{message.content}</div>
    </div>
  );
}
```

---

## 4. **API Integration Prompt Example**

When calling your image generation API, send:
```json
{
  "prompt": "A futuristic city skyline at sunset, with flying cars and neon lights."
}
```
And expect:
```json
{
  "imageUrl": "https://your-image-api.com/generated/abc123.png"
}
```

---

## 5. **Summary of Steps to Implement**
1. Update your `Message` type to support images.
2. Add UI for users to request image generation (button or `/image` command).
3. Integrate with a text-to-image API (Gemini, DALL·E, Stable Diffusion, etc.).
4. Render image messages in the chat UI.
5. Optionally, handle loading states and errors for image generation.
