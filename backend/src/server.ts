import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chat.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Spur AI Backend Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});