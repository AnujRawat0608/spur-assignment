import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `
You are a helpful support agent.

Store Information:

Shipping:
- Worldwide shipping
- Delivery in 5-7 business days

Returns:
- Returns accepted within 30 days

Support Hours:
- Monday-Friday
- 9 AM - 6 PM
`;

export async function generateReply(
  history: any[],
  userMessage: string
) {
  const response =
    await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...history,
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

  return response.choices[0].message.content;
}