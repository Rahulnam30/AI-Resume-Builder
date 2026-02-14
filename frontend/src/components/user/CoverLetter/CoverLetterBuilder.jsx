import { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Building2, Briefcase, FileText, User, 
  Download, AlertTriangle 
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
    openingParagraph: "",
    bodyParagraph1: "",
    bodyParagraph2: "",
    closingParagraph: "",
    salutation: "Sincerely",
    customSalutation: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [activeSection, setActiveSection] = useState("recipient");
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [isPreviewHidden, setIsPreviewHidden] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ✅ PERFECT WORD EXPORT - NO DEPENDENCIES (IDENTICAL TO PDF)
  const exportToWord = () => {
    if (!formData.fullName || !formData.jobTitle) {
      alert('Please fill your name and job title first');
      return;
    }

    setIsExporting(true);

    const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Cover Letter - ${formData.jobTitle}</title><style>
      @page { margin: 0.75in; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, serif !important;
        font-size: 12pt !important; line-height: 1.4 !important; color: #1e293b !important;
        padding: 0.75in !important; max-width: 8.5in !important; margin: 0 auto !important;
      }
      .contact-info { text-align: right !important; margin-bottom: 0.25in !important; font-size: 11pt !important; line-height: 1.3 !important; }
      .contact-name { font-weight: 600 !important; font-size: 13pt !important; margin-bottom: 0.15in !important; }
      .contact-details { margin-bottom: 0.2in !important; font-size: 10pt !important; }
      .letter-date { color: #64748b !important; font-size: 11pt !important; margin-top: 0.15in !important; }
      .recipient-info { margin-bottom: 0.75in !important; max-width: 4in !important; line-height: 1.3 !important; font-size: 11pt !important; }
      .recipient-line { margin-bottom: 0.15in !important; }
      .recipient-name { font-weight: 500 !important; }
      .company-name { font-weight: 600 !important; }
      .salutation { font-weight: 600 !important; font-size: 13pt !important; margin-bottom: 0.75in !important; }
      .subject-section { text-align: center !important; margin-bottom: 0.75in !important; }
      .subject-box { 
        display: inline-block !important; border: 1px solid #cbd5e1 !important; 
        padding: 0.25in 0.4in !important; background: #f8fafc !important; 
        font-weight: 600 !important; font-size: 11pt !important; text-transform: uppercase !important; 
        letter-spacing: 0.5px !important; min-width: 4in !important;
      }
      .subject-ref { font-size: 10pt !important; color: #64748b !important; margin-top: 0.1in !important; font-weight: normal !important; text-transform: none !important; }
      .body-paragraph { text-indent: 2em !important; margin-bottom: 0.5in !important; line-height: 1.6 !important; font-size: 12pt !important; }
      .signature { margin-top: 2in !important; text-align: right !important; }
      .signature-closing { margin-bottom: 0.25in !important; font-size: 13pt !important; }
      .signature-name { font-weight: 600 !important; font-size: 13pt !important; }
    </style></head><body>`;

    const postHtml = `</body></html>`;

    const htmlContent = `
      <div class="contact-info">
        <div class="contact-name">${formData.fullName}</div>
        ${(formData.address || '').replace(/\n/g, '<br>')}
        <div class="contact-details">
          ${formData.email || ''}${(formData.phone ? ' | ' + formData.phone : '')}
          ${(formData.linkedin ? '<br>' + formData.linkedin : '')}
        </div>
        <div class="letter-date">${date}</div>
      </div>
      <div class="recipient-info">
        <div class="recipient-line recipient-name">${formData.recipientName || 'Hiring Manager'}</div>
        ${formData.recipientTitle ? `<div class="recipient-line">${formData.recipientTitle}</div>` : ''}
        ${formData.companyName ? `<div class="recipient-line company-name">${formData.companyName}</div>` : ''}
        ${(formData.companyAddress || '').replace(/\n/g, '<br>')}
      </div>
      <div class="salutation">Dear ${formData.recipientName || 'Hiring Manager'},</div>
      ${(formData.jobTitle || formData.jobReference) ? `
        <div class="subject-section">
          <div class="subject-box">
            ${formData.jobTitle ? `Re: ${formData.jobTitle}` : ''}
            ${formData.jobReference ? `<div class="subject-ref">Reference: ${formData.jobReference}</div>` : ''}
          </div>
        </div>
      ` : ''}
      <div class="body-paragraph">${(formData.openingParagraph || '').replace(/\n/g, '<br><br>')}</div>
      <div class="body-paragraph">${(formData.bodyParagraph1 || '').replace(/\n/g, '<br><br>')}</div>
      <div class="body-paragraph">${(formData.bodyParagraph2 || '').replace(/\n/g, '<br><br>')}</div>
      <div class="body-paragraph">${(formData.closingParagraph || '').replace(/\n/g, '<br><br>')}</div>
      <div class="signature">
        <div class="signature-closing">${formData.customSalutation || formData.salutation || 'Sincerely'}</div>
        <div class="signature-name">${formData.fullName}</div>
      </div>
    `;

    const html = preHtml + htmlContent + postHtml;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cover-Letter-${formData.jobTitle.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 30)}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  // YOUR PERFECT PDF EXPORT (unchanged)
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
        <title>PDF - ${formData.jobTitle}</title>
        <style>
          @page { margin: 0.75in 0.75in 0.75in 0.75in !important; size: Letter !important; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', serif !important;
            font-size: 12pt !important;
            line-height: 1.4 !important;
            color: #1e293b !important;
            background: white !important;
            padding: 0.4in !important;
            max-width: 8.5in !important;
            margin: 0 auto !important;
          }
          .contact-info { 
            text-align: right !important; 
            margin-bottom: 0.25in !important; 
            font-size: 11pt !important; 
            line-height: 1.3 !important;
          }
          .contact-name { 
            font-weight: 600 !important; 
            font-size: 13pt !important; 
            margin-bottom: 0.15in !important; 
          }
          .contact-details { margin-bottom: 0.2in !important; font-size: 10pt !important; }
          .letter-date { 
            color: #64748b !important; 
            font-size: 11pt !important; 
            margin-top: 0.15in !important;
          }
          .recipient-info { 
            margin-bottom: 0.75in !important; 
            max-width: 4in !important; 
            line-height: 1.3 !important;
            font-size: 11pt !important;
          }
          .recipient-line { 
            margin-bottom: 0.15in !important; 
          }
          .recipient-name { font-weight: 500 !important; }
          .company-name { font-weight: 600 !important; }
          .salutation { 
            font-weight: 600 !important; 
            font-size: 13pt !important; 
            margin-bottom: 0.75in !important; 
          }
          .subject-section { 
            text-align: center !important; 
            margin-bottom: 0.75in !important; 
          }
          .subject-box { 
            display: inline-block !important;
            border-top: 1px solid #cbd5e1 !important; 
            border-bottom: 1px solid #cbd5e1 !important;
            padding: 0.25in 0.4in !important;
            background: #f8fafc !important;
            font-weight: 600 !important;
            font-size: 11pt !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            min-width: 4in !important;
          }
          .subject-ref { 
            font-size: 10pt !important; 
            color: #64748b !important; 
            margin-top: 0.1in !important;
            font-weight: normal !important;
            text-transform: none !important;
          }
          .body-paragraph { 
            text-indent: 2em !important; 
            margin-bottom: 0.5in !important; 
            line-height: 1.6 !important;
            font-size: 12pt !important;
            text-align: left !important;
          }
          .signature { 
            margin-top: 2in !important; 
            text-align: right !important; 
          }
          .signature-closing { 
            margin-bottom: 0.25in !important; 
            font-size: 13pt !important;
          }
          .signature-name { 
            font-weight: 600 !important; 
            font-size: 13pt !important; 
          }
          @media print { 
            body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } 
          }
        </style>
      </head>
      <body onload="setTimeout(() => window.print(), 800)">
        <div class="contact-info">
          <div class="contact-name">${formData.fullName || 'Your Name'}</div>
          ${(formData.address || '').replace(/\n/g, '<br>')}
          <div class="contact-details">
            ${formData.email || ''}${(formData.phone ? ' | ' + formData.phone : '')}
            ${(formData.linkedin ? '<br>' + formData.linkedin : '')}
          </div>
          <div class="letter-date">${date}</div>
        </div>
        <div class="recipient-info">
          <div class="recipient-line recipient-name">${formData.recipientName || 'Hiring Manager'}</div>
          ${formData.recipientTitle ? `<div class="recipient-line">${formData.recipientTitle}</div>` : ''}
          ${formData.companyName ? `<div class="recipient-line company-name">${formData.companyName}</div>` : ''}
          ${(formData.companyAddress || '').replace(/\n/g, '<br>')}
        </div>
        <div class="salutation">Dear ${formData.recipientName || 'Hiring Manager'},</div>
        ${(formData.jobTitle || formData.jobReference) ? `
          <div class="subject-section">
            <div class="subject-box">
              ${formData.jobTitle ? `Re: ${formData.jobTitle}` : ''}
              ${formData.jobReference ? `<div class="subject-ref">Reference: ${formData.jobReference}</div>` : ''}
            </div>
          </div>
        ` : ''}
        <div class="body-paragraph">${(formData.openingParagraph || '').replace(/\n/g, '<br>')}</div>
        <div class="body-paragraph">${(formData.bodyParagraph1 || '').replace(/\n/g, '<br>')}</div>
        <div class="body-paragraph">${(formData.bodyParagraph2 || '').replace(/\n/g, '<br>')}</div>
        <div class="body-paragraph">${(formData.closingParagraph || '').replace(/\n/g, '<br>')}</div>
        <div class="signature">
          <div class="signature-closing">${formData.customSalutation || formData.salutation || 'Sincerely'}</div>
          <div class="signature-name">${formData.fullName || 'Your Name'}</div>
        </div>
        <div style="text-align: center; margin-top: 1in; color: #94a3b8; font-size: 10pt;">
          Print (Ctrl+P) → Destination: "Save as PDF"
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => setIsExporting(false), 2000);
  };

  const currentIdx = tabs.findIndex((t) => t.id === activeSection);

  const goLeft = () => {
    if (currentIdx > 0) setActiveSection(tabs[currentIdx - 1].id);
  };

  const goRight = () => {
    if (currentIdx < tabs.length - 1)
      setActiveSection(tabs[currentIdx + 1].id);
  };

  const renderFormContent = () => {
    switch (activeSection) {
      case "recipient":
        return <RecipientInfoForm formData={formData} onInputChange={handleInputChange} />;
      case "job":
        return <JobDetailsForm formData={formData} onInputChange={handleInputChange} />;
      case "body":
        return <BodyContentForm formData={formData} onInputChange={handleInputChange} />;
      case "closing":
        return <ClosingForm formData={formData} onInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <UserNavBar />
      <div className="p-3">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-['Outfit']">Create Cover Letter</h1>
          <div className="flex gap-3">
            <button
              onClick={exportToPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl shadow-xl hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent" />
                  <span>PDF</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>PDF</span>
                </>
              )}
            </button>
            <button
              onClick={exportToWord}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent" />
                  <span>Word</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>Word</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-5">
          <AlertTriangle size={20} />
          Fill all sections to generate a professional cover letter.
        </div>

        <div className="md:hidden mb-6">
          <CoverLetterPreview
            formData={formData}
            selectedTemplate={selectedTemplate}
            isExpanded={isPreviewExpanded}
            onExpand={() => setIsPreviewExpanded(true)}
            onCollapse={() => setIsPreviewExpanded(false)}
            onMinimize={() => setIsPreviewHidden(true)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[32%_68%] gap-10">
          <div className="bg-white rounded-xl p-2">
            <CoverLetterFormTabs
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            <div className="mt-5">{renderFormContent()}</div>
            <div className="flex justify-between mt-6">
              {currentIdx > 0 && (
                <button
                  onClick={goLeft}
                  className="flex items-center gap-1 bg-slate-100 px-4 py-2 rounded-lg"
                >
                  <ArrowLeft size={18} />
                  Previous
                </button>
              )}
              <button
                onClick={goRight}
                className="flex items-center gap-1 bg-black text-white px-6 py-2 rounded-lg"
              >
                {currentIdx === tabs.length - 1 ? "Finish" : "Next"}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            {!isPreviewHidden && (
              <div className="h-[950px]">
                <CoverLetterPreview
                  formData={formData}
                  selectedTemplate={selectedTemplate}
                  isExpanded={isPreviewExpanded}
                  onExpand={() => setIsPreviewExpanded(true)}
                  onCollapse={() => setIsPreviewExpanded(false)}
                  onMinimize={() => setIsPreviewHidden(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
