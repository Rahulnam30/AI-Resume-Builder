import { chatBotAPIResponse } from "../ai/aiService.js"

export const ChatbotResponse = async (req, res) => {
  try {
    const { message, prevMsg, isLoggedIn } = req.body;

    /* ===============================
       CALL AI SERVICE
    =============================== */

    const aiResponse = await chatBotAPIResponse(
      message,
      prevMsg,
      isLoggedIn
    );

    let parsed;

    /* ===============================
       PARSE AI RESPONSE
    =============================== */

    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        parsed = { mode: "message", text: aiResponse };
      }
    } catch {
      parsed = {
        mode: "message",
        text: aiText || "Sorry, I couldn't generate a response."
      };
    }
    return res.json({ ...parsed });
  } catch (error) {
    console.error("❌ Chatbot Controller Error:", error);
    return res.status(500).json({
      reply: {
        mode: "message",
        text: "Something went wrong. Please try again later."
      }
    });
  }
};