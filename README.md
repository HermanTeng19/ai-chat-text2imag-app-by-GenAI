# AI Chatbox Online

A modern, clean, and fully functional AI chat web application built with Next.js, TypeScript, and Tailwind CSS. Inspired by ChatGPT, this app features a minimalistic, responsive design and modular code structure.

## Features
- Single-page chat interface
- User and AI messages with avatars
- AI text responses (Gemini 2.0 Flash Preview API)
- **Text-to-image generation**: Generate images from prompts using Gemini 2.0 Flash Preview
- Responsive layout for mobile and desktop
- Modular, atomic component design
- Clean, readable UI with light theme

## Usage
- **Text chat:** Type your message and press Send.
- **Image generation:** Type `/image your prompt here` (e.g., `/image a cat riding a skateboard in space`) and press Send. The AI will generate and display an image based on your prompt.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React hooks (`useState`, `useEffect`)
- **AI:** Gemini 2.0 Flash Preview API (text and image)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

```
ai-chat-app/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main chat page
│   └── globals.css        # Global styles
├── components/
│   ├── avatar.tsx         # User/AI avatar
│   ├── chat-container.tsx # Scrollable chat area
│   ├── chat-input.tsx     # Input bar
│   ├── chat-message.tsx   # Single message
│   └── header.tsx         # Top bar
├── hooks/
│   └── use-chat.ts        # Chat state logic
├── lib/
│   └── ai.ts              # AI response logic (text & image)
├── public/
│   └── avatar/
│       ├── user.png       # User avatar (placeholder)
│       └── ai.png         # AI avatar (placeholder)
├── types/
│   └── message.ts         # Message type
├── utils/
│   └── format-timestamp.ts# Timestamp formatting
├── README.md
└── ... (config files)
```

## Customization
- To connect to a real AI API, update `lib/ai.ts`.
- Replace avatar images in `public/avatar/` for custom branding.

## License
MIT
