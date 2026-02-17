import Groq from "groq-sdk";


function getGroqClient() {
  let groq;
  if (!groq) {
    const apiKey = process.env.GROQ_API_KEY;

    if (apiKey && apiKey !== "gsk_placeholder" && apiKey.trim() !== "") {
      groq = new Groq({ apiKey });
      return groq;
    } else {
      console.warn("⚠️ GROQ_API_KEY is missing or invalid. AI features will be disabled.");
      return null;
    }
  }
  return groq;
}

export async function generateResumeAI(data) {
  try {
    let groq = getGroqClient();
    if (!groq) return "AI Service Unavailable";

    console.log("AI FUNCTION CALLED");
    console.log("INPUT DATA:", data);
    const formatEducation = (education = []) =>
      education
        .map(
          (e) =>
            `${e.degree || "Degree"} in ${e.school || "Institution"}`
        )
        .join(", ");

    const formatExperience = (experience = []) =>
      experience
        .map(
          (e) =>
            `${e.title || "Role"} at ${e.company || "Company"}`
        )
        .join(", ");

    const formatProjects = (projects = []) =>
      projects
        .map(
          (p) =>
            `${p.name || "Project"} using ${p.technologies || "various technologies"}`
        )
        .join(", ");


    const formatCertifications = (certifications = []) =>
      certifications
        .map(
          (c) =>
            `${c.name || "Certification"} issued by ${c.issuer || "a recognized organization"
            }`
        )
        .join(", ");

    const formatSkills = (skills = {}) => {
      const technical = skills.technical?.join(", ") || "";
      const soft = skills.soft?.join(", ") || "";
      return [technical, soft].filter(Boolean).join(", ");
    };
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

      Instructions:
      - If a professional summary is provided by the user, analyze it and improve it.
      - Preserve the user's intent and core information.
      - Do NOT repeat the summary verbatim.
      - If no summary is provided, generate one from the candidate details.

      Candidate Details:
      Name: ${data.fullName}
      Skills: ${formatSkills(data.skills) || "Not provided"}
      Education: ${formatEducation(data.education) || "Not provided"}
      Experience: ${formatExperience(data.experience) || "Not provided"}
      Certifications: ${formatCertifications(data.certifications) || "Not provided"}
      Projects: ${formatProjects(data.projects) || "Not provided"}
      Existing Summary: ${data.summary?.trim() || "Not provided"}

      Example format: "I am a skilled software developer with expertise in..."
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // WORKING MODEL
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("AI SERVICE ERROR:", error);
    throw error;
  }
};

export async function refineExperienceDescription(data) {
  try {
    let groq = getGroqClient();
    if (!groq) throw new Error("AI Service Unavailable");

    console.log("AI FUNCTION CALLED");
    console.log("INPUT DATA:", data);
    const prompt = `
      You are a deterministic ATS resume experience rewriting engine.

      NON-NEGOTIABLE RULES:
      - Rewrite ONLY the provided experience description.
      - NEVER ask questions.
      - NEVER request more information.
      - NEVER explain your reasoning.
      - NEVER generate summaries, overviews, or placeholders.
      - NEVER invent or infer details.

      HARD FAILURE CONDITION:
      If the experience description is missing, empty, null, undefined,
      or has fewer than 5 meaningful words,
      OUTPUT EXACTLY this JSON and STOP IMMEDIATELY:
      { "status": "error", "text": "No description is provided." }

      OUTPUT FORMAT:
      - JSON only
      - No extra keys
      - No surrounding text
      - No markdown

      SUCCESS FORMAT:
      {
        "status": "success",
        "text": "ATS-optimized rewritten experience description"
      }

      STYLE CONSTRAINTS:
      - 1-2 concise lines
      - Resume-ready
      - Plain English
      - Strong action verbs
      - No buzzwords, no fluff

      IMPORTANT:
      Job title, company, and dates are CONTEXT ONLY.
      They must NOT be used to generate new content.

      EXPERIENCE DESCRIPTION (rewrite ONLY this text):
      <<<${data.description}>>>
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // WORKING MODEL
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("AI SERVICE ERROR:", error);
    throw error;
  }
}

export async function refineProjectDescription(data) {
  try {
    let groq = getGroqClient();
    if (!groq) throw new Error("AI Service Unavailable");

    console.log("AI FUNCTION CALLED");
    console.log("INPUT DATA:", data);
    const prompt = `
      You are a deterministic ATS resume project description rewriting engine.

      NON-NEGOTIABLE RULES:
      - Rewrite ONLY the provided project description.
      - NEVER ask questions.
      - NEVER request more information.
      - NEVER explain your reasoning.
      - NEVER generate summaries, overviews, or placeholders.
      - NEVER invent or infer details.

      HARD FAILURE CONDITION:
      If the project description is missing, empty, null, undefined,
      or has fewer than 5 meaningful words,
      OUTPUT EXACTLY this JSON and STOP IMMEDIATELY:
      { "status": "error", "text": "No description is provided." }

      OUTPUT FORMAT:
      - JSON only
      - No extra keys
      - No surrounding text
      - No markdown

      SUCCESS FORMAT:
      {
        "status": "success",
        "text": "ATS-optimized rewritten experience description"
      }

      STYLE CONSTRAINTS:
      - 1-2 concise lines
      - Resume-ready
      - Plain English
      - Strong action verbs
      - No buzzwords, no fluff

      IMPORTANT:
      Job title, company, and dates are CONTEXT ONLY.
      They must NOT be used to generate new content.

      EXPERIENCE DESCRIPTION (rewrite ONLY this text):
      <<<${data.description}>>>
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // WORKING MODEL
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("AI SERVICE ERROR:", error);
    throw error;
  }
}

export const generateCoverLetterAI = async (jobDetails, sectionType) => {
  try {
    console.log("🧠 COVER LETTER AI CALLED");
    console.log("🔍 Section:", sectionType);
    console.log("📝 Job Details:", JSON.stringify(jobDetails, null, 2));

    const client = getGroqClient();
    if (!client) {
      console.warn("⚠️ AI Service unavailable (Missing API Key)");
      throw new Error("AI Service unavailable (Missing API Key)");
    }

    let prompt = "";
    const baseContext = `
      Job Title: ${jobDetails.jobTitle || 'Role'}
      Company: ${jobDetails.companyName || 'Company'}
      Candidate Name: ${jobDetails.fullName || 'Candidate'}
      Skills/Context: ${jobDetails.skills || ''}
      Experience: ${jobDetails.experience || ''}
    `;

    switch (sectionType) {
      case 'openingParagraph':
        prompt = `
          Write a professional opening paragraph for a cover letter for the position of ${jobDetails.jobTitle} at ${jobDetails.companyName}.
          Context:
          ${baseContext}
          
          Rules:
          - Write in first person ("I").
          - Express enthusiasm for the role and company.
          - Mention why you are a great fit briefly.
          - Keep it under 4 lines.
          - STRICTLY NO placeholders like [Role] or [Company]. Use the provided details.
          - STRICTLY NO meta-commentary like "Here is the paragraph". Just the text.
          - Tone: Professional, Confident, Engaging.
        `;
        break;

      case 'bodyParagraph1':
        prompt = `
          Write the first body paragraph of a cover letter focusing on key qualifications.
          Context:
          ${baseContext}
          
          Rules:
          - Focus on the candidate's skills and experience relevant to ${jobDetails.jobTitle}.
          - Use specific examples if available in the context.
          - STRICTLY NO placeholders. If specific numbers aren't known, use qualitative descriptors (e.g., "significant increase", "led a team").
          - STRICTLY NO meta-commentary. Just the paragraph text.
          - Keep it under 6 lines.
        `;
        break;

      case 'bodyParagraph2':
        prompt = `
          Write the second body paragraph of a cover letter focusing on cultural fit and additional value.
          Context:
          ${baseContext}
          
          Rules:
          - Explain why the candidate is passionate about ${jobDetails.companyName} or the industry.
          - Mention soft skills like leadership, collaboration, or problem-solving.
          - STRICTLY NO placeholders.
          - STRICTLY NO meta-commentary. Just the paragraph text.
          - Keep it under 6 lines.
        `;
        break;

      case 'closingParagraph':
        prompt = `
          Write a strong closing paragraph for a cover letter.
          Context:
          ${baseContext}
          
          Rules:
          - Reiterate interest in the ${jobDetails.jobTitle} role.
          - Include a call to action (requesting an interview).
          - Thank the reader.
          - Do NOT include the signature ("Sincerely, Name"). JUST the paragraph.
          - STRICTLY NO placeholders.
          - STRICTLY NO meta-commentary.
          - Keep it under 3 lines.
        `;
        break;

      default:
        throw new Error("Invalid section type");
    }

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 250,
    });

    return response.choices[0].message.content.trim();

  } catch (error) {
    console.error("❌ AI COVER LETTER ERROR:", error);
    throw error;
  }
};

export default { generateResumeAI, generateCoverLetterAI, refineExperienceDescription, refineProjectDescription };
