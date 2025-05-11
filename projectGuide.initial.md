Project: AI Chat Website using Next.js

Goal:
Build a modern, clean, and fully functional AI chat web application similar to ChatGPT.

Tech Stack:
- Framework: Next.js (latest version with App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: useState / useEffect or Zustand (if needed)
- API: Async function to simulate or call AI response (e.g. via OpenAI API)

Functional Requirements:
1. A single-page chat interface.
2. Users can input text into a chat box.
3. After submission, the input is displayed in the chat history.
4. The system returns a simulated or real AI-generated reply and appends it to the chat.
5. Support streaming responses (optional, if possible).
6. Responsive layout for mobile and desktop.

UI/UX Design Guidelines:
- Reference Apple and Google’s design systems.
- Layout should be minimalistic, elegant, and highly usable.
- Rounded UI elements, soft shadows, and clear hierarchy.
- Light theme by default.
- Use good spacing, padding, and intuitive interaction.
- Typography should be clean and readable.

Components to include:
- ChatMessage: Displays user and AI messages with different styling.
- ChatInput: A fixed input bar at the bottom.
- ChatContainer: Scrollable main area holding all chat messages.
- Header: Optional branding/logo bar at the top.

Non-Functional Goals:
- Code should be modular and reusable.
- Follow best practices for Next.js app folder structure.
- Fast load time and optimized layout.
- Simple yet aesthetically pleasing transitions (e.g. fade-in for new messages).

Optional:
- Use framer-motion for subtle animations.
- Add placeholder user avatar and AI assistant avatar.

Output:
Generate all required files in a standard Next.js app structure (`app/`, `components/`, `styles/`, etc.).

Project Structure:

ai-chatbox-online/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ChatContainer.tsx
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   ├── Header.tsx
│   └── Avatar.tsx
├── hooks/
│   └── useChat.ts
├── lib/
│   └── ai.ts
├── public/
│   └── avatar/
│       ├── user.png
│       └── ai.png
├── styles/
│   └── tailwind.config.ts
├── types/
│   └── message.ts
├── utils/
│   └── formatTimestamp.ts
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md