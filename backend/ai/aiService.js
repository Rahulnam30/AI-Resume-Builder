import Groq from "groq-sdk";

function getGroq() {
  let groq;
  if (!groq) {
    const apiKey = process.env.GROQ_API_KEY;
    console.log("GROQ_API_KEY:", apiKey ? "LOADED" : "MISSING");
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is missing");
    }
    groq = new Groq({ apiKey });
  }
  return groq;
}

// ✅ 1. Resume Summary Generator
export async function generateResumeAI(data) {
  try {
    let groq = getGroq();
    console.log("AI FUNCTION CALLED: generateResumeAI");
    console.log("INPUT DATA:", data);
    
    const formatEducation = (education = []) =>
      education.map((e) => `${e.degree || "Degree"} in ${e.school || "Institution"}`).join(", ");
    
    const formatExperience = (experience = []) =>
      experience.map((e) => `${e.title || "Role"} at ${e.company || "Company"}`).join(", ");
    
    const formatProjects = (projects = []) =>
      projects.map((p) => `${p.name || "Project"} using ${p.technologies || "various technologies"}`).join(", ");
    
    const formatCertifications = (certifications = []) =>
      certifications.map((c) => `${c.name || "Certification"} issued by ${c.issuer || "a recognized organization"}`).join(", ");
    
    const formatSkills = (skills = {}) => {
      const technical = skills.technical?.join(", ") || "";
      const soft = skills.soft?.join(", ") || "";
      return [technical, soft].filter(Boolean).join(", ");
    };
    
    const prompt = `
      Create ONLY a professional resume summary in first person.
      Rules: 3-4 lines only, FIRST PERSON "I", no headings, no bullets, plain text, start with "I am" or "I have"
      Candidate Details:
      Name: ${data.fullName}
      Skills: ${formatSkills(data.skills) || "Not provided"}
      Education: ${formatEducation(data.education) || "Not provided"}
      Experience: ${formatExperience(data.experience) || "Not provided"}
      Projects: ${formatProjects(data.projects) || "Not provided"}
      Certifications: ${formatCertifications(data.certifications) || "Not provided"}
      Existing Summary: ${data.summary?.trim() || "Not provided"}
    `;
    
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI SERVICE ERROR:", error);
    throw error;
  }
}

// ✅ 2. Experience Description Refiner
export async function refineExperienceDescription(data) {
  try {
    let groq = getGroq();
    console.log("AI FUNCTION CALLED: refineExperienceDescription");
    
    const prompt = `
      Rewrite ONLY this experience description as ATS-optimized text.
      OUTPUT JSON: {"status": "success", "text": "rewritten description"}
      If empty: {"status": "error", "text": "No description is provided."}
      EXPERIENCE: <<<${data.description}>>>
    `;
    
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI SERVICE ERROR:", error);
    throw error;
  }
}

// ✅ 3. Project Description Refiner
export async function refineProjectDescription(data) {
  try {
    let groq = getGroq();
    console.log("AI FUNCTION CALLED: refineProjectDescription");
    
    const prompt = `
      Rewrite ONLY this project description as ATS-optimized text (max 500 chars).
      OUTPUT JSON: {"status": "success", "text": "rewritten description"}
      If empty: {"status": "error", "text": "No description is provided."}
      PROJECT: <<<${data.description}>>>
    `;
    
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI SERVICE ERROR:", error);
    throw error;
  }
}

// ✅ 4. Extract Data from Resume Text (FIX #1)
export async function extractResumeData(resumeText) {
  try {
    const groq = getGroq();
    console.log("Extracting resume data from text...");
    
    const prompt = `
      Parse this resume text into JSON:
      {
        "fullName": "",
        "email": "",
        "phone": "",
        "skills": {"technical": [], "soft": []},
        "experience": [{"title": "", "company": "", "description": ""}],
        "education": [{"degree": "", "school": "", "year": ""}]
      }
      Resume: ${resumeText.substring(0, 4000)}
    `;
    
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1
    });
    
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Resume extraction failed:", error);
    return {
      fullName: "", email: "", phone: "",
      skills: { technical: [], soft: [] },
      experience: [], education: []
    };
  }
}

// ✅ 5. Parse Resume File (FIX #2 - CURRENT ERROR)
export async function parseResume(resumeFilePath) {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const resumeText = await fs.readFile(resumeFilePath, 'utf-8');
    console.log("Parsing resume file:", resumeFilePath);
    
    const parsedData = await extractResumeData(resumeText);
    
    return {
      success: true,
      data: parsedData,
      filePath: resumeFilePath
    };
  } catch (error) {
    console.error("Resume parsing failed:", error);
    return {
      success: false,
      error: error.message,
      filePath: resumeFilePath
    };
  }
}
