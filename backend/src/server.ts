import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import chatRoutes from "./routes/chat.routes";

dotenv.config();

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