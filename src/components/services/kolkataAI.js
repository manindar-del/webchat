import { askAI } from "./aiService";

export const getKolkataAIReply = async (message) => {
  const text = message.toLowerCase();

  const isKolkataRelated =
    text.includes("kolkata") ||
    text.includes("howrah") ||
    text.includes("park street") ||
    text.includes("salt lake") ||
    text.includes("durga puja") ||
    text.includes("metro") ||
    text.includes("bengal");

  if (!isKolkataRelated) {
    return " I only answer Kolkata-related questions 😊";
  }

  const prompt = `
You are a Kolkata expert AI assistant.
Answer only about Kolkata, West Bengal.

User question: ${message}
`;

  return await askAI(prompt);
};