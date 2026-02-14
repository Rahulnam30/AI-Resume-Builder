import Groq from "groq-sdk";

let groq;

try {
  const apiKey = process.env.GROQ_API_KEY;
  if (apiKey && apiKey !== "gsk_placeholder" && apiKey.trim() !== "") {
    groq = new Groq({ apiKey });
  } else {
    console.warn("⚠️ GROQ_API_KEY is missing or invalid. AI features will be disabled.");
  }
} catch (error) {
  console.warn("⚠️ Failed to initialize Groq client:", error.message);
}

async function generateResumeAI(data) {
  try {
    console.log("🧠 AI FUNCTION CALLED");

    if (!groq) {
      console.warn("⚠️ AI Service is disabled due to missing API Key.");
      return "This is a placeholder AI summary. Please add a valid GROQ_API_KEY to your backend .env file to generate real AI content based on your profile.";
    }

    console.log("🧠 INPUT DATA:", data);

    const prompt = `
Create ONLY a professional resume summary in first person.

Rules:
- 3 to 4 lines only
- Write in FIRST PERSON using "I" (not the candidate's name)
- No headings
- No bullet points
- No explanations
- No notes
- Plain text only
- Focus on key achievements and skills
- Start with "I am" or "I have"

Candidate Details:
Name: ${data.name}
Skills: ${data.skills || "Not provided"}
Education: ${data.education || "Not provided"}
Experience: ${data.experience || "Not provided"}
Projects: ${data.projects || "Not provided"}

Example format: "I am a skilled software developer with expertise in..."
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // ✅ WORKING MODEL
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("❌ AI SERVICE ERROR:", error);
    // Return a fallback message instead of crashing the request
    return "AI generation failed. Please try again later or check server logs.";
  }
}

export default generateResumeAI;
