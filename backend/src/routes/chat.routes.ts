import { Router } from "express";
import { prisma } from "../db/prisma";
import { generateReply } from "../services/llm.service";

const router = Router();

/**
 * Health Check
 */
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

/**
 * Send Message
 */
router.post("/message", async (req, res) => {
  try {
    const { message, sessionId } = req.body || {};

    if (!message?.trim()) {
      return res.status(400).json({
        error: "Message cannot be empty",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: "Message is too long",
      });
    }

    let conversationId = sessionId;

    // Create a new conversation if one doesn't exist
    if (!conversationId) {
      const conversation = await prisma.conversation.create({
        data: {},
      });

      conversationId = conversation.id;
    }

    // Save user message
    await prisma.message.create({
      data: {
        conversationId,
        sender: "user",
        text: message,
      },
    });

    // Fetch conversation history
    const history = await prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Convert DB messages into LLM format
    const formattedHistory = history.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    // Generate AI response
    const reply = await generateReply(
      formattedHistory,
      message
    );

    // Save AI response
    await prisma.message.create({
      data: {
        conversationId,
        sender: "ai",
        text: reply || "",
      },
    });

    return res.json({
      reply,
      sessionId: conversationId,
    });
  } catch (error: any) {
    console.error("FULL ERROR:", error);

    return res.status(500).json({
      error:
        error?.message ||
        "Sorry, the AI assistant is unavailable right now.",
    });
  }
});

/**
 * Get Conversation History
 */
router.get("/history/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        conversationId: sessionId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.json(messages);
  } catch (error: any) {
    console.error("HISTORY ERROR:", error);

    return res.status(500).json({
      error: "Failed to fetch conversation history",
    });
  }
});

export default router;