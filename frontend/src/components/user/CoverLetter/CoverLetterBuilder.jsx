// ✅ COMPLETE CoverLetterBuilder.jsx - ALL FIXES APPLIED (Feb 19, 2026)
import { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Building2, Briefcase, FileText, User, 
  Download, AlertTriangle, FileText as FileTextIcon
} from 'lucide-react';
import CoverLetterFormTabs from "./CoverLetterFormTabs";
import RecipientInfoForm from "./forms/RecipientInfoForm";
import JobDetailsForm from "./forms/JobDetailsForm";
import BodyContentForm from "./forms/BodyContentForm";
import ClosingForm from "./forms/ClosingForm";
import CoverLetterPreview from "./CoverLetterPreview";
import CoverLetterTemplates from "./CoverLetterTemplates";
import UserNavBar from "../UserNavBar/UserNavBar";
import "./CoverLetterBuilder.css";

const tabs = [
  { id: "recipient", label: "Recipient", icon: Building2 },
  { id: "job", label: "Job Details", icon: Briefcase },
  { id: "body", label: "Content", icon: FileText },
  { id: "closing", label: "Closing", icon: User },
];

const CoverLetterBuilder = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    recipientName: "",
    recipientTitle: "",
    companyName: "",
    companyAddress: "",
    jobTitle: "",
    jobReference: "",
    jobSummary: "",
    jobDescription: "",
    openingParagraph: "",
    bodyParagraph1: "",
    bodyParagraph2: "",
    closingParagraph: "",
    salutation: "Sincerely",
    customSalutation: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [activeSection, setActiveSection] = useState("recipient");
  const [isExporting, setIsExporting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  /* ===== PDF EXPORT - ALL FIXES APPLIED ===== */
  const exportToPDF = () => {
    if (!formData.fullName || !formData.jobTitle) {
      alert('Please fill your name and job title first');
      return;
    }

    setIsExporting(true);
    const printWindow = window.open('', '_blank', 'width=850,height=1100');
    
    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<title>Professional Cover Letter</title>
<style>
@page { margin: 1.25in 0.85in 0.75in 0.85in !important; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Times New Roman', Times, serif !important;
  font-size: 11pt !important;
  line-height: 1.3 !important;
  color: black !important;
  background: white !important;
  padding: 0 !important;
}

/* ✅ USER INFO - PERFECT SPACING (MATCHES RECIPIENT) */
.contact-info { 
  text-align: right !important; 
  margin-bottom: 18pt !important; 
  font-size: 11pt !important;
  padding: 6pt 0 !important;
}
.contact-name { 
  font-weight: bold !important; 
  font-size: 11pt !important; 
  margin-bottom: 2pt !important;
}
.contact-details { 
  font-size: 9pt !important;
  line-height: 1.2 !important;
  margin-bottom: 4pt !important;
}
.contact-details div { 
  margin-bottom: 1pt !important;
}
.letter-date { 
  font-size: 11pt !important; 
  margin-top: 4pt !important;
}

/* JOB REFERENCE */
.job-reference {
  text-align: center !important;
  margin: 12pt 0 !important;
  font-size: 10pt !important;
}
.job-title { 
  font-weight: bold !important; 
  font-size: 10pt !important; 
  text-transform: uppercase !important;
}
.job-ref { 
  font-size: 9pt !important; 
  margin-top: 1pt !important;
}

/* JOB DETAILS */
.job-details-section {
  margin-bottom: 12pt !important;
  font-size: 10pt !important;
  font-style: italic !important;
  padding: 6pt 0 !important;
  border-left: 2px solid #666 !important;
  padding-left: 12pt !important;
}
.job-details-section div { margin-top: 4pt !important; }

/* ✅ RECIPIENT INFO - IDENTICAL SPACING */
.recipient-info { 
  margin-bottom: 24pt !important; 
  max-width: 4in !important;
  font-size: 10pt !important;
  padding-left: 6pt !important;
}
.recipient-info > div { 
  margin-bottom: 2pt !important; 
  line-height: 1.2 !important;
}
.recipient-name, .company-name { 
  font-weight: bold !important; 
  margin-bottom: 2pt !important;
}

.salutation { 
  font-weight: bold !important; 
  font-size: 11pt !important; 
  margin: 6pt 0 12pt 0 !important;
}

.body-paragraph {
  text-indent: 0.2in !important;
  margin-bottom: 10pt !important;
  line-height: 1.4 !important;
  font-size: 11pt !important;
}
.body-paragraph:last-child { margin-bottom: 24pt !important; }

/* ✅ SIGNATURE - TIGHT SPACING */
.signature { 
  margin-top: 24pt !important; 
  text-align: right !important;
}
.signature-closing { 
  margin-bottom: 2pt !important;
  font-size: 11pt !important;
  font-style: italic !important;
}
.signature-name { 
  font-weight: bold !important; 
  font-size: 11pt !important;
}

@media print { body { -webkit-print-color-adjust: exact !important; } }
</style>
</head>
<body onload="window.print(); setTimeout(() => window.close(), 1000);">
<div class="contact-info">
  <div class="contact-name">${formData.fullName || 'Your Name'}</div>
  ${formData.address ? formData.address.replace(/\n/g,'<br>') : ''}
  <div class="contact-details">
    ${formData.email ? formData.email : ''}
    ${formData.phone ? `<br>${formData.phone}` : ''}
    ${formData.linkedin ? `<br>${formData.linkedin}` : ''}
  </div>
  <div class="letter-date">${date}</div>
</div>

${(formData.jobTitle || formData.jobReference) ? `
<div class="job-reference">
  ${formData.jobTitle ? `<div class="job-title">RE: ${formData.jobTitle.toUpperCase()}</div>` : ''}
  ${formData.jobReference ? `<div class="job-ref">Ref: ${formData.jobReference}</div>` : ''}
</div>
` : ''}

${(formData.jobSummary || formData.jobDescription) ? `
<div class="job-details-section">
  ${formData.jobSummary ? `<div><strong>Job Summary:</strong> ${formData.jobSummary}</div>` : ''}
  ${formData.jobDescription ? `<div><strong>Key Responsibilities:</strong> ${formData.jobDescription}</div>` : ''}
</div>
` : ''}

<div class="recipient-info">
  <div class="recipient-name">${formData.recipientName || 'Hiring Manager'}</div>
  ${formData.recipientTitle ? `<div>${formData.recipientTitle}</div>` : ''}
  ${formData.companyName ? `<div class="company-name">${formData.companyName}</div>` : ''}
  ${formData.companyAddress ? formData.companyAddress.replace(/\n/g,'<br>') : ''}
</div>

<div class="salutation">Dear ${formData.recipientName || 'Hiring Manager'},</div>

<div class="body-paragraph">${(formData.openingParagraph || "I'm excited to apply for this position...").replace(/\n/g,'<br>')}</div>
<div class="body-paragraph">${(formData.bodyParagraph1 || "In my previous role...").replace(/\n/g,'<br>')}</div>
<div class="body-paragraph">${(formData.bodyParagraph2 || "My technical skills include...").replace(/\n/g,'<br>')}</div>
<div class="body-paragraph">${(formData.closingParagraph || "I'm particularly drawn to your company...").replace(/\n/g,'<br>')}</div>

<div class="signature">
  <div class="signature-closing">${formData.customSalutation || formData.salutation || 'Sincerely'}</div>
  <div class="signature-name">${formData.fullName || 'Your Name'}</div>
</div>
</body>
</html>`);
    
    printWindow.document.close();
    setTimeout(() => setIsExporting(false), 1500);
  };

// Replace the ENTIRE `exportToWord` function with this corrected version:

const exportToWord = () => {
  if (!formData.fullName || !formData.jobTitle) {
    alert('Please fill your name and job title first');
    return;
  }

  setIsExporting(true);

  const html = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:w="urn:schemas-microsoft-com:office:word"
  xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>Cover Letter - ${formData.jobTitle}</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
<w:ValidateAgainstSchemas/>
<w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>
<w:IgnoreMixedContent>false</w:IgnoreMixedContent>
<w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>
<w:DoNotPromoteQF/>
<w:LidThemeOther>EN-US</w:LidThemeOther>
<w:LidThemeAsian>X-NONE</w:LidThemeAsian>
<w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>
<w:Compatibility>
<w:BreakWrappedTables/>
<w:SnapToGridInCell/>
<w:WrapTextWithPunct/>
<w:UseAsianBreakRules/>
<w:DontGrowAutofit/>
<w:SplitPgBreakAndParaMark/>
<w:DontVertAlignCellWithSp/>
<w:DontBreakConstrainedForcedTables/>
<w:DontVertAlignInTxbx/>
<w:Word11KerningPairs/>
<w:CachedColBalance/>
</w:Compatibility>
<w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel>
</xml>
<![endif]-->
<style>
@page { 
  margin: 1.25in 0.85in 0.75in 0.85in !important; 
  size: A4 portrait !important; 
}
* { margin: 0 !important; padding: 0 !important; box-sizing: border-box !important; }

/* ✅ TOP SPACING - 2 FULL LINES (36pt) */
body {
  font-family: 'Times New Roman', 'Times', serif !important;
  font-size: 11pt !important;
  line-height: 1.3 !important;
  color: black !important;
  background: white !important;
  padding: 36pt 0 0 0 !important; /* ✅ 2 LINES TOP SPACING */
  width: 794px !important;
  margin: 0 auto !important;
}

/* ✅ ALL CONTENT 11PT - PERFECT PDF MATCH */
.contact-info { 
  text-align: right !important; 
  margin-bottom: 18pt !important; 
  font-size: 11pt !important;
  padding: 6pt 0 !important;
}
.contact-name { 
  font-weight: bold !important; 
  font-size: 11pt !important; 
  margin-bottom: 2pt !important;
}
.contact-details { 
  font-size: 11pt !important; /* ✅ CHANGED TO 11PT */
  line-height: 1.2 !important;
  margin-bottom: 4pt !important;
}
.contact-details div { 
  margin-bottom: 1pt !important;
  font-size: 11pt !important; /* ✅ 11PT */
}
.letter-date { 
  font-size: 11pt !important; 
  margin-top: 4pt !important;
}

.job-reference {
  text-align: center !important;
  margin: 12pt 0 !important;
  font-size: 11pt !important; /* ✅ 11PT */
}
.job-title { 
  font-weight: bold !important; 
  font-size: 11pt !important; /* ✅ 11PT */
  text-transform: uppercase !important;
  margin-bottom: 1pt !important;
}
.job-ref { 
  font-size: 11pt !important; /* ✅ 11PT */
}

.job-details-section {
  margin-bottom: 12pt !important;
  font-size: 11pt !important; /* ✅ 11PT */
  font-style: italic !important;
  padding: 6pt 0 !important;
  border-left: 2px solid #666 !important;
  padding-left: 12pt !important;
}
.job-details-section div { 
  margin-top: 4pt !important;
  font-size: 11pt !important; /* ✅ 11PT */
}

.recipient-info { 
  margin-bottom: 24pt !important; 
  max-width: 4in !important;
  font-size: 11pt !important; /* ✅ 11PT */
  padding-left: 6pt !important;
}
.recipient-info > div { 
  margin-bottom: 2pt !important; 
  line-height: 1.2 !important;
  font-size: 11pt !important; /* ✅ 11PT */
}
.recipient-name, .company-name { 
  font-weight: bold !important; 
  margin-bottom: 2pt !important;
  font-size: 11pt !important; /* ✅ 11PT */
}
.recipient-title { 
  margin-bottom: 2pt !important;
  font-size: 11pt !important; /* ✅ 11PT */
}

.salutation { 
  font-weight: bold !important; 
  font-size: 11pt !important; 
  margin: 6pt 0 12pt 0 !important;
}

.body-paragraph {
  text-indent: 0.2in !important;
  margin-bottom: 10pt !important;
  line-height: 1.4 !important;
  font-size: 11pt !important;
}
.body-paragraph:last-child { 
  margin-bottom: 24pt !important;
}

.signature { 
  margin-top: 24pt !important; 
  text-align: right !important;
}
.signature-closing { 
  margin-bottom: 2pt !important;
  font-size: 11pt !important;
  font-style: italic !important;
}
.signature-name { 
  font-weight: bold !important; 
  font-size: 11pt !important;
}

p, div, span { 
  font-family: inherit !important; 
  font-size: 11pt !important; /* ✅ GLOBAL 11PT */
  line-height: inherit !important; 
}
</style>
</head>
<body>
<div class="contact-info">
  <div class="contact-name">${formData.fullName || 'Your Name'}</div>
  ${formData.address ? formData.address.split('\n').filter(Boolean).map((line, i) => `<div>${line}</div>`).join('') : ''}
  <div class="contact-details">
    ${formData.email ? `<div>${formData.email}</div>` : ''}
    ${formData.phone ? `<div>${formData.phone}</div>` : ''}
    ${formData.linkedin ? `<div>${formData.linkedin}</div>` : ''}
  </div>
  <div class="letter-date">${date}</div>
</div>

${(formData.jobTitle || formData.jobReference) ? `
<div class="job-reference">
  ${formData.jobTitle ? `<div class="job-title">RE: ${formData.jobTitle.toUpperCase()}</div>` : ''}
  ${formData.jobReference ? `<div class="job-ref">Ref: ${formData.jobReference}</div>` : ''}
</div>
` : ''}

${(formData.jobSummary || formData.jobDescription) ? `
<div class="job-details-section">
  ${formData.jobSummary ? `<div><strong>Job Summary:</strong> ${formData.jobSummary}</div>` : ''}
  ${formData.jobDescription ? `<div><strong>Key Responsibilities:</strong> ${formData.jobDescription}</div>` : ''}
</div>
` : ''}

<div class="recipient-info">
  <div class="recipient-name">${formData.recipientName || 'Hiring Manager'}</div>
  ${formData.recipientTitle ? `<div class="recipient-title">${formData.recipientTitle}</div>` : ''}
  ${formData.companyName ? `<div class="company-name">${formData.companyName}</div>` : ''}
  ${formData.companyAddress ? formData.companyAddress.split('\n').filter(Boolean).map((line, i) => `<div>${line}</div>`).join('') : ''}
</div>

<div class="salutation">Dear ${formData.recipientName || 'Hiring Manager'},</div>

<div class="body-paragraph">${(formData.openingParagraph || "I'm excited to apply for this position...").replace(/\n/g, '<br>')}</div>
<div class="body-paragraph">${(formData.bodyParagraph1 || "In my previous role...").replace(/\n/g, '<br>')}</div>
<div class="body-paragraph">${(formData.bodyParagraph2 || "My technical skills include...").replace(/\n/g, '<br>')}</div>
<div class="body-paragraph">${(formData.closingParagraph || "I'm particularly drawn to your company...").replace(/\n/g, '<br>')}</div>

<div class="signature">
  <div class="signature-closing">${formData.customSalutation || formData.salutation || 'Sincerely'}</div>
  <div class="signature-name">${formData.fullName || 'Your Name'}</div>
</div>
</body>
</html>`; // ✅ END HTML

  const blob = new Blob(["\ufeff", html], {
    type: "application/msword;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Cover-Letter-${formData.jobTitle.replace(/[^a-zA-Z0-9]/g, '-')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  setTimeout(() => setIsExporting(false), 800);
};


  const currentIdx = tabs.findIndex(t => t.id === activeSection);
  const goLeft = () => currentIdx > 0 && setActiveSection(tabs[currentIdx - 1].id);
  const goRight = () => currentIdx < tabs.length - 1 && setActiveSection(tabs[currentIdx + 1].id);

  const renderFormContent = () => {
    switch(activeSection) {
      case "recipient": return <RecipientInfoForm formData={formData} onInputChange={handleInputChange}/>;
      case "job": return <JobDetailsForm formData={formData} onInputChange={handleInputChange}/>;
      case "body": return <BodyContentForm formData={formData} onInputChange={handleInputChange}/>;
      case "closing": return <ClosingForm formData={formData} onInputChange={handleInputChange}/>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 relative z-0">
      <UserNavBar />
      <div className="px-2 py-4 sm:px-4 lg:px-4 w-screen max-w-full mx-0">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-6 gap-3 lg:gap-4 px-2">
          <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold font-['Outfit'] text-gray-900 leading-tight">
            Create Cover Letter
          </h1>
          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={exportToPDF} 
              disabled={isExporting} 
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 disabled:opacity-60 transition-all font-medium text-sm"
            >
              <Download size={16}/> PDF
            </button>
            <button 
              onClick={exportToWord} 
              disabled={isExporting} 
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-60 transition-all font-medium text-sm"
            >
              <Download size={16}/> Word
            </button>
          </div>
        </div>
        <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4 shadow-sm px-2">
          <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18}/>
          <span className="text-sm font-medium text-amber-800">Fill Job Summary & Description in Job Details tab for complete professional letter.</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-2 w-full h-[82vh] lg:h-[85vh] px-2 relative z-10">
          {/* FORM PANEL */}
          <div className="lg:col-span-5 xl:col-span-5 order-2 lg:order-1 pr-0 lg:pr-1 relative z-20">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 lg:p-4 h-full flex flex-col max-h-[calc(100vh-6rem)] overflow-hidden">
              <CoverLetterFormTabs activeSection={activeSection} setActiveSection={setActiveSection} />
              <div className="mt-3 flex-1 overflow-y-auto py-2 pr-2">{renderFormContent()}</div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 px-1">
                {currentIdx > 0 && (
                  <button onClick={goLeft} className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs">
                    <ArrowLeft size={14}/> Previous
                  </button>
                )}
                <div className="flex-1 text-center text-xs text-gray-500 font-medium">
                  Step {currentIdx + 1} of {tabs.length}
                </div>
                <button onClick={goRight} className="flex items-center gap-1 bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2 rounded-lg shadow-lg text-xs">
                  {currentIdx === tabs.length - 1 ? "Finish" : "Next"}
                  <ArrowRight size={14}/>
                </button>
              </div>
            </div>
          </div>
         
          {/* PREVIEW PANEL */}
          <div className="col-span-1 lg:col-span-7 xl:col-span-7 order-1 lg:order-2 pl-0 lg:pl-1 relative z-10 h-[82vh] lg:h-[85vh] flex flex-col">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col flex-1 overflow-hidden h-full">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50 flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileTextIcon size={20} className="text-blue-600"/>
                  Live Preview
                </h2>
                <p className="text-xs text-gray-500 mt-1">Scroll to see full letter</p>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-6 lg:p-8 preview-scroll-container">
                <CoverLetterPreview 
                  formData={formData} 
                  exportDate={date}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
