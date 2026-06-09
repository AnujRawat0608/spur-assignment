Spur AI Support Chat Agent

## 🔗 Live Links

Frontend:
https://spur-assignment-rosy.vercel.app/

Backend:
https://spur-assignment-1-a985.onrender.com/

A full-stack AI-powered customer support chat application built as part of the Spur Founding Full-Stack Engineer take-home assignment.
The app simulates a real customer support agent that responds to user queries using an LLM (Groq / OpenAI-compatible API), with full conversation persistence using Prisma + SQLite/PostgreSQL.
________________________________________
 Features
•	 Real-time chat UI (user + AI messages) 
•	LLM-powered responses (Groq / OpenAI-compatible API) 
•	 Persistent conversations using database 
•	 Session-based chat history restoration 
•	 Clean backend API (TypeScript + Express) 
•	 FAQ-aware AI (shipping, returns, support hours) 
•	 Input validation + error handling 
________________________________________
Tech Stack
Backend
•	Node.js 
•	Express.js 
•	TypeScript 
•	Prisma ORM 
•	SQLite / PostgreSQL 
Frontend
•	React / Vite (or your framework used) 
AI
•	Groq API (OpenAI-compatible) 
•	LLM: llama-3.3-70b-versatile 
________________________________________
Project Structure
backend/
 ├── src/
 │   ├── routes/
 │   │    └── chat.routes.ts
 │   ├── services/
 │   │    └── llm.service.ts
 │   ├── db/
 │   │    └── prisma.ts
 │   └── server.ts
 ├── prisma/
 │   └── schema.prisma

frontend/
 ├── src/
 │   ├── components/
 │   ├── App.tsx
 │   └── main.tsx
________________________________________
Database Schema
Conversation
•	id (UUID) 
•	createdAt 
Message
•	id (UUID) 
•	conversationId (FK) 
•	sender (user | ai) 
•	text 
•	createdAt 
________________________________________
Setup Instructions
1. Clone Repository
git clone https://github.com/user-name/spur-assignment.git
cd spur-assignment
________________________________________
2. Backend Setup
cd backend
npm install
________________________________________
3. Environment Variables
Create .env file:
DATABASE_URL="file:./dev.db"
GROQ_API_KEY="your_api_key_here"
________________________________________
4. Prisma Setup
npx prisma migrate dev --name init
npx prisma generate
________________________________________
5. Run Backend
npm run dev
Backend runs on:
http://localhost:3000
________________________________________
6. Frontend Setup
cd frontend
npm install
npm run dev
Frontend runs on:
http://localhost:5173
________________________________________
API Reference
POST /chat/message
Request
{
  "message": "What is your return policy?",
  "sessionId": "optional-session-id"
}
Response
{
  "reply": "You can return items within 30 days...",
  "sessionId": "generated-or-existing-id"
}
________________________________________
GET /chat/history/:sessionId
Returns full conversation history.
________________________________________
 LLM Design
•	Uses Groq API (OpenAI-compatible) 
•	System prompt defines a fictional support agent: 
You are a helpful support agent for a small e-commerce store.
Answer clearly and concisely.
•	Includes full conversation history for context 
•	Handles API failures gracefully with fallback message 
________________________________________
Error Handling
•	Empty messages rejected 
•	Long messages handled safely 
•	LLM/API failures return friendly fallback response 
•	Backend never crashes on invalid input 
________________________________________
 Security
•	API keys stored in .env 
•	.env excluded from Git 
•	No secrets committed (GitHub push protection compliant) 
________________________________________
Design Decisions
•	Prisma used for simple and clean DB management 
•	Session-based chat instead of authentication (as per requirement) 
•	LLM wrapped inside service layer for extensibility 
•	Modular backend structure for future channels (WhatsApp/IG ready design) 
________________________________________
 If I Had More Time
•	Add Redis caching for chat history 
•	Improve streaming responses (token-by-token UI) 
•	Add authentication for users 
•	Add rate limiting per session 
•	Improve UI with typing animation + message bubbles 
•	Deploy backend + frontend fully 
________________________________________
 Key Highlights
✔ Full-stack AI chat system
✔ Persistent memory via DB
✔ Clean API design
✔ Real LLM integration
✔ Production-style architecture
________________________________________
 Author
Built as a take-home assignment for Spur Engineer role

Test reuslt :-
<img width="1920" height="1030" alt="image" src="https://github.com/user-attachments/assets/2ee1df21-5c66-40ff-91d0-29cd872271ca" />


