// =====================================================
// ATS RESUME ANALYZER (ROLE-AWARE, JOB-DESCRIPTION-AWARE)
// =====================================================

/**
 * Detect resume profile type
 */
const detectProfileType = (text) => {
  const techSignals = [
    "javascript","react","node","api","mongodb","sql",
    "python","java","developer","engineer","frontend","backend"
  ];

  const nonTechSignals = [
    "manager","operations","sales","marketing","hr","recruiter",
    "account","business","client","communication","strategy"
  ];

  let techScore = 0;
  let nonTechScore = 0;

  techSignals.forEach(k => text.includes(k) && techScore++);
  nonTechSignals.forEach(k => text.includes(k) && nonTechScore++);

  if (techScore >= 2 && techScore >= nonTechScore) return "tech";
  if (nonTechScore > techScore) return "non-tech";
  return "general";
};

/**
 * Extract keywords from text
 */
const extractKeywords = (text) => {
  if (!text) return [];
  return Array.from(
    new Set(text.toLowerCase().match(/\b[a-z0-9\-]+\b/g) || [])
  );
};

/**
 * Analyze resume for ATS compatibility
 */
export const analyzeATSCompatibility = (
  resumeText,
  extractedData,
  jobDescription = "",
  fileType = ""
) => {
  console.log("===== ATS FUNCTION STARTED =====");

  const analysis = {
    overallScore: 0,
    profileType: "general",
    sectionScores: [],
    matchedKeywords: [],
    missingKeywords: [],
    suggestions: [],
    metrics: {
      fileFormatCompatibility: false,
      contactInformation: false,
      keywordDensity: false,
      sectionHeadings: false,
      measurableResults: false,
    },
  };

  const resumeLower = resumeText.toLowerCase();

  // =====================================================
  // PROFILE DETECTION
  // =====================================================
  const profileType = detectProfileType(resumeLower);
  analysis.profileType = profileType;

  // =====================================================
  // 1. FILE FORMAT COMPATIBILITY (10)
  // =====================================================
  const validFormats = ["pdf", "doc", "docx"];
  let fileScore = 0;

  if (fileType && validFormats.includes(fileType.toLowerCase())) {
    fileScore = 10;
    analysis.metrics.fileFormatCompatibility = true;
  }

  analysis.sectionScores.push({
    sectionName: "File Format Compatibility",
    score: fileScore,
    status: fileScore ? "ok" : "error",
    suggestions: fileScore
      ? []
      : ["Upload your resume in PDF or DOC/DOCX format for maximum ATS compatibility."]
  });

  analysis.overallScore += fileScore;

  // =====================================================
  // 2. CONTACT INFORMATION (15)
  // =====================================================
  let contactScore = 0;
  const missingContacts = [];

  if (extractedData.email) contactScore += 5;
  else missingContacts.push("email");

  if (extractedData.phone) contactScore += 5;
  else missingContacts.push("phone");

  if (extractedData.linkedin) contactScore += 3;
  else missingContacts.push("LinkedIn");

  if (extractedData.github && profileType === "tech") contactScore += 2;

  analysis.metrics.contactInformation = contactScore >= 10;

  analysis.sectionScores.push({
    sectionName: "Contact Information",
    score: contactScore,
    status: contactScore >= 10 ? "ok" : "warn",
    suggestions: missingContacts.length
      ? [`Ensure your resume includes: ${missingContacts.join(", ")}.`]
      : []
  });

  analysis.overallScore += contactScore;

  // =====================================================
  // 3. KEYWORD DENSITY (20)
  // =====================================================
  const PROFILE_KEYWORDS = {
    tech: [
      "html","css","javascript","react","node","express",
      "mongodb","api","git","testing","deployment","performance"
    ],
    "non-tech": [
      "communication","leadership","operations","planning",
      "reporting","coordination","client","stakeholder",
      "process","analysis","strategy"
    ],
    general: [
      "team","collaboration","problem solving",
      "time management","adaptability","communication"
    ],
  };

  let combinedKeywords = PROFILE_KEYWORDS[profileType];

  if (jobDescription && jobDescription.trim().length > 20) {
    const jdKeywords = extractKeywords(jobDescription);
    combinedKeywords = Array.from(new Set([...combinedKeywords, ...jdKeywords]));
  }

  let keywordScore = 0;

  combinedKeywords.forEach((kw) => {
    const matches = resumeLower.match(new RegExp(`\\b${kw}\\b`, "gi")) || [];
    if (matches.length) {
      keywordScore += Math.min(3, matches.length);
      analysis.matchedKeywords.push({ keyword: kw });
    } else {
      analysis.missingKeywords.push({ keyword: kw });
    }
  });

  keywordScore = Math.min(20, keywordScore);
  analysis.metrics.keywordDensity = keywordScore >= 14;

  analysis.sectionScores.push({
    sectionName: "Keyword Density",
    score: keywordScore,
    status: keywordScore >= 14 ? "ok" : "warn",
    suggestions: keywordScore >= 14
      ? []
      : ["Add missing keywords relevant to the job description and role."]
  });

  analysis.overallScore += keywordScore;

  // =====================================================
  // 4. SECTION HEADINGS (16)
  // =====================================================
  const sectionAliases = {
    experience: ["experience", "work experience", "employment"],
    education: ["education", "academics"],
    skills: ["skills", "technical skills", "core competencies"],
    projects: ["projects", "personal projects"],
  };

  let sectionScore = 0;

  Object.values(sectionAliases).forEach((aliases) => {
    if (aliases.some(a => new RegExp(`\\b${a}\\b`, "i").test(resumeText))) {
      sectionScore += 4;
    }
  });

  sectionScore = Math.min(16, sectionScore);
  analysis.metrics.sectionHeadings = sectionScore >= 12;

  analysis.sectionScores.push({
    sectionName: "Section Headings",
    score: sectionScore,
    status: sectionScore >= 12 ? "ok" : "warn",
    suggestions: sectionScore >= 12
      ? []
      : ["Use clear ATS-friendly section headings like Experience, Skills, Education, and Projects."]
  });

  analysis.overallScore += sectionScore;

  // =====================================================
  // 5. MEASURABLE RESULTS (14)
  // =====================================================
  const measurableRegex =
    /\b\d+%|\b\d+\s*(users|clients|projects|features|months|years)|increased|decreased|improved|reduced|optimized|led|built|developed|implemented/gi;

  const measurableMatches = resumeText.match(measurableRegex) || [];
  const measurableScore = Math.min(14, new Set(measurableMatches).size * 3);

  analysis.metrics.measurableResults = measurableScore >= 9;

  analysis.sectionScores.push({
    sectionName: "Measurable Results",
    score: measurableScore,
    status: measurableScore >= 9 ? "ok" : "warn",
    suggestions: measurableScore >= 9
      ? []
      : [
          profileType === "tech"
            ? "Quantify your impact with metrics like performance gains, load time reduction, or users served."
            : "Add measurable achievements such as revenue growth, efficiency improvement, or team performance."
        ]
  });

  analysis.overallScore += measurableScore;

  // =====================================================
  // FINAL SCORE
  // =====================================================
  analysis.overallScore = Math.min(100, Math.round(analysis.overallScore));

  console.log("===== FINAL ATS ANALYSIS =====");
  console.log(analysis);

  return analysis;
};

/**
 * Generate ATS recommendations
 */
export const generateRecommendations = (analysis) => {
  return analysis.sectionScores
    .flatMap(s => s.suggestions)
    .map((text, index) => ({
      id: index + 1,
      priority: "high",
      description: text,
    }));
};

/**
 * ATS Threshold Check
 */
export const passesATSThreshold = (score) => {
  return score >= 80;
};
