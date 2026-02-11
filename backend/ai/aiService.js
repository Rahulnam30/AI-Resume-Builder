import Groq from "groq-sdk";


function getGroq() {
  let groq;
  if (!groq) {
    const apiKey = process.env.GROQ_API_KEY;

    console.log(
      "GROQ_API_KEY:",
      apiKey ? "LOADED" : "MISSING"
    );

    if (!apiKey) {
      throw new Error("GROQ_API_KEY is missing");
    }

    groq = new Groq({ apiKey });
  }
  return groq;
}

export async function generateResumeAI(data) {
  try {
    let groq = getGroq();
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
}

export async function refineExperienceDescription(data) {
  try {
    let groq = getGroq();
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
      - Give a concise, ATS-optimized rewrite of the experience description.

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
    let groq = getGroq();
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
      - Max 500 character

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
