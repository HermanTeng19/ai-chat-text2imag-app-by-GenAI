## 1. **Feature Overview**

- **User Authentication:**  
  - Sign up and log in with email/password or Google.
  - Show user’s avatar and name when logged in.
  - Allow logout.

- **Chat History:**  
  - Save each user’s chat history (messages, timestamps, image URLs, etc.) to Firestore.
  - Load chat history on login so users can continue previous conversations.

---

## 2. **Firebase Setup**

- Create a Firebase project.
- Enable **Authentication** (Email/Password and Google).
- Enable **Firestore Database**.

---

## 3. **Structural Prompt for Implementation**

### **a. Firebase Initialization**

- Add Firebase config to your project (use environment variables for keys).
- Initialize Firebase app, Auth, and Firestore in a `lib/firebase.ts` file.

### **b. Authentication Logic**

- Use Firebase Auth for:
  - **Sign up** (email/password)
  - **Login** (email/password)
  - **Google login** (with popup)
  - **Logout**
- Store user info (uid, displayName, email, photoURL) in app state.

### **c. UI/UX Flow**

- Show login/signup page if not authenticated.
- Show chat UI if authenticated, with user avatar/name and logout button.

### **d. Chat History Storage**

- On every message sent/received, save it to Firestore under the user’s document:
  ```
  /users/{uid}/chats/{chatId}/messages/{messageId}
  ```
- On login, load the latest chat history for the user and display it in the chat window.

---

## 4. **Example Firestore Data Structure**

```json
// users/{uid}/chats/{chatId}/messages/{messageId}
{
  "id": "messageId",
  "sender": "user" | "ai",
  "content": "Hello!",
  "timestamp": 1715450000000,
  "type": "text" | "image",
  "imageUrl": "https://..."
}
```

---

## 5. **Component/Module Structure**

- `lib/firebase.ts` — Firebase config/init
- `hooks/useAuth.ts` — Auth logic (login, signup, Google, logout, user state)
- `hooks/useChat.ts` — Chat logic (now also loads/saves messages to Firestore)
- `components/AuthForm.tsx` — Login/signup UI
- `components/UserMenu.tsx` — Show user info and logout

---

## 6. **Authentication UI Flow**

- If not logged in:  
  - Show AuthForm (email/password fields, Google login button)
- If logged in:  
  - Show chat UI, user avatar/name, and logout button

---

## 7. **Chat History Flow**

- On login:  
  - Load user’s chat history from Firestore and display in chat.
- On new message:  
  - Save message to Firestore under the user’s chat.

---

## 8. **Security**

- Use Firestore security rules to ensure users can only read/write their own data.

---

## 9. **Example Usage**

- User signs up/logs in (email or Google)
- User chats with AI (text or image)
- All messages are saved to Firestore
- On next login, user sees their previous chat history

