/**
 * Analyze resume for ATS compatibility
 */
export const analyzeATSCompatibility = (text, extractedData) => {
  const analysis = {
    overallScore: 0,
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

  // 1. FILE FORMAT COMPATIBILITY (20 points)
  analysis.metrics.fileFormatCompatibility = true;
  analysis.sectionScores.push({
    sectionName: "File Format Compatibility",
    score: 20,
    status: "ok",
  });
  analysis.overallScore += 20;

  // 2. CONTACT INFORMATION (20 points)
  let contactScore = 0;
  if (extractedData.email) contactScore += 10;
  if (extractedData.phone) contactScore += 10;

  analysis.metrics.contactInformation = contactScore === 20;
  analysis.sectionScores.push({
    sectionName: "Contact Information",
    score: contactScore,
    status: contactScore === 20 ? "ok" : "warn",
  });
  analysis.overallScore += contactScore;

  if (!extractedData.email) {
    analysis.suggestions.push("Add a valid email address");
  }
  if (!extractedData.phone) {
    analysis.suggestions.push("Add a phone number");
  }

  // 3. KEYWORD DENSITY (20 points)
  const commonATSKeywords = [
    "experience",
    "skills",
    "education",
    "certification",
    "project",
    "management",
    "leadership",
    "team",
    "communication",
    "problem solving",
    "results",
    "achieved",
    "improved",
    "developed",
    "implemented",
  ];

  let keywordCount = 0;
  const textLower = text.toLowerCase();

  commonATSKeywords.forEach((keyword) => {
    if (textLower.includes(keyword.toLowerCase())) {
      keywordCount++;
      analysis.matchedKeywords.push({ keyword });
    } else {
      analysis.missingKeywords.push({ keyword });
    }
  });

  const keywordScore = Math.min(
    20,
    Math.floor((keywordCount / commonATSKeywords.length) * 20)
  );
  analysis.metrics.keywordDensity = keywordScore >= 15;
  analysis.sectionScores.push({
    sectionName: "Keyword Density",
    score: keywordScore,
    status: keywordScore >= 15 ? "ok" : "warn",
  });
  analysis.overallScore += keywordScore;

  if (keywordScore < 15) {
    analysis.suggestions.push(
      "Include more industry-relevant keywords in your resume"
    );
  }

  // 4. SECTION HEADINGS (20 points)
  const requiredSections = [
    "experience",
    "education",
    "skills",
    "summary",
    "objective",
  ];
  let sectionCount = 0;

  requiredSections.forEach((section) => {
    const regex = new RegExp(`\\b${section}\\b`, "gi");
    if (regex.test(text)) {
      sectionCount++;
    }
  });

  const sectionScore = Math.min(20, Math.floor((sectionCount / 3) * 20));
  analysis.metrics.sectionHeadings = sectionScore >= 15;
  analysis.sectionScores.push({
    sectionName: "Section Headings",
    score: sectionScore,
    status: sectionScore >= 15 ? "ok" : "warn",
  });
  analysis.overallScore += sectionScore;

  if (sectionCount < 3) {
    analysis.suggestions.push(
      "Add clear section headings (Experience, Education, Skills)"
    );
  }

  // 5. MEASURABLE RESULTS (20 points)
  const numberRegex = /\d+%|\d+\+|increased|decreased|improved|reduced|grew/gi;
  const measurableMatches = text.match(numberRegex) || [];

  const measurableScore = Math.min(20, measurableMatches.length * 5);
  analysis.metrics.measurableResults = measurableScore >= 15;
  analysis.sectionScores.push({
    sectionName: "Measurable Results",
    score: measurableScore,
    status: measurableScore >= 15 ? "ok" : "error",
  });
  analysis.overallScore += measurableScore;

  if (measurableScore < 15) {
    analysis.suggestions.push(
      "Add more quantifiable achievements (e.g., 'Increased sales by 25%')"
    );
  }

  // Calculate final score out of 10
  const finalScore = (analysis.overallScore / 100) * 10;
  analysis.overallScore = Number(finalScore.toFixed(1));

  return analysis;
};

/**
 * Generate ATS recommendations
 */
export const generateRecommendations = (analysis) => {
  const recommendations = [];

  if (!analysis.metrics.contactInformation) {
    recommendations.push({
      priority: "high",
      title: "Add Complete Contact Information",
      description:
        "Include your email address and phone number at the top of your resume.",
    });
  }

  if (!analysis.metrics.keywordDensity) {
    recommendations.push({
      priority: "high",
      title: "Improve Keyword Density",
      description:
        "Add more relevant industry keywords to match job descriptions.",
    });
  }

  if (!analysis.metrics.sectionHeadings) {
    recommendations.push({
      priority: "medium",
      title: "Use Clear Section Headings",
      description:
        "Organize your resume with standard sections: Experience, Education, Skills.",
    });
  }

  if (!analysis.metrics.measurableResults) {
    recommendations.push({
      priority: "high",
      title: "Add Measurable Achievements",
      description:
        "Include numbers and percentages to quantify your accomplishments.",
    });
  }

  return recommendations;
};

/**
 * Check if resume passes ATS threshold
 */
export const passesATSThreshold = (score) => {
  return score >= 7.0; // 70% pass rate
};