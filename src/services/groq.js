import axios from "axios";

const GROQ_API_KEY = "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"; // Replace this with your key
const GROQ_API_BASE_URL = "https://api.groq.com/openai/v1/chat/completions";

export const sendMessageToGroq = async (
  messages,
  model = "llama-3.3-70b-versatile",
  maxTokens = 200,
  temperature = 1
) => {
  try {
    const response = await axios.post(
      GROQ_API_BASE_URL,
      {
        model,
        messages,
        max_completion_tokens: maxTokens,
        temperature,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0]?.message?.content || "No response from Groq API.";
  } catch (error) {
    console.error("Error communicating with Groq API:", error.message);
    throw error;
  }
};