// Sample downloads data for demonstration
export const generateSampleDownloads = () => {
  const sampleDownloads = [
    {
      id: 'sample-1',
      name: 'Senior_Backend_Developer_Resume',
      type: 'resume',
      format: 'PDF',
      size: '245 KB',
      downloadDate: new Date().toISOString(),
      template: 'Modern Professional',
      views: 12,
      starred: true,
      color: 'blue',
      url: '#'
    },
    {
      id: 'sample-2',
      name: 'Google_Application_Cover_Letter',
      type: 'cover-letter',
      format: 'PDF',
      size: '156 KB',
      downloadDate: new Date(Date.now() - 86400000).toISOString(),
      template: 'Classic',
      views: 8,
      starred: false,
      color: 'purple',
      url: '#'
    },
    {
      id: 'sample-3',
      name: 'Academic_Curriculum_Vitae',
      type: 'cv',
      format: 'DOCX',
      size: '198 KB',
      downloadDate: new Date(Date.now() - 172800000).toISOString(),
      template: 'Academic Standard',
      views: 24,
      starred: true,
      color: 'green',
      url: '#'
    },
    {
      id: 'sample-4',
      name: 'UX_Designer_Portfolio_CV',
      type: 'cv',
      format: 'PDF',
      size: '542 KB',
      downloadDate: new Date(Date.now() - 216000000).toISOString(),
      template: 'Visual Portfolio',
      views: 45,
      starred: true,
      color: 'blue',
      url: '#'
    },
    {
      id: 'sample-5',
      name: 'Project_Manager_ATS_Resume',
      type: 'resume',
      format: 'DOCX',
      size: '235 KB',
      downloadDate: new Date(Date.now() - 259200000).toISOString(),
      template: 'ATS Friendly',
      views: 15,
      starred: false,
      color: 'green',
      url: '#'
    },
    {
      id: 'sample-6',
      name: 'Executive_Marketing_Resume',
      type: 'resume',
      format: 'PDF',
      size: '267 KB',
      downloadDate: new Date(Date.now() - 345600000).toISOString(),
      template: 'Executive',
      views: 19,
      starred: true,
      color: 'blue',
      url: '#'
    },
    {
      id: 'sample-7',
      name: 'Software_Engineer_Internship_Resume',
      type: 'resume',
      format: 'PDF',
      size: '210 KB',
      downloadDate: new Date(Date.now() - 432000000).toISOString(),
      template: 'Minimalist',
      views: 31,
      starred: false,
      color: 'blue',
      url: '#'
    },
    {
      id: 'sample-8',
      name: 'Financial_Analyst_Cover_Letter',
      type: 'cover-letter',
      format: 'DOCX',
      size: '128 KB',
      downloadDate: new Date(Date.now() - 518400000).toISOString(),
      template: 'Modern',
      views: 5,
      starred: false,
      color: 'green',
      url: '#'
    },
    {
      id: 'sample-9',
      name: 'Researcher_Scientific_CV',
      type: 'cv',
      format: 'PDF',
      size: '890 KB',
      downloadDate: new Date(Date.now() - 604800000).toISOString(),
      template: 'Detailed',
      views: 104,
      starred: true,
      color: 'purple',
      url: '#'
    },
    {
      id: 'sample-10',
      name: 'Product_Designer_Resume',
      type: 'resume',
      format: 'PDF',
      size: '412 KB',
      downloadDate: new Date(Date.now() - 691200000).toISOString(),
      template: 'Creative Dark',
      views: 56,
      starred: true,
      color: 'blue',
      url: '#'
    },
    {
      id: 'sample-11',
      name: 'Creative_Director_CV',
      type: 'cv',
      format: 'PDF',
      size: '1.2 MB',
      downloadDate: new Date(Date.now() - 777600000).toISOString(),
      template: 'Artist Showcase',
      views: 89,
      starred: false,
      color: 'orange',
      url: '#'
    },
    {
      id: 'sample-12',
      name: 'Customer_Support_Resume',
      type: 'resume',
      format: 'DOCX',
      size: '185 KB',
      downloadDate: new Date(Date.now() - 864000000).toISOString(),
      template: 'Standard',
      views: 12,
      starred: false,
      color: 'green',
      url: '#'
    },
    {
      id: 'sample-13',
      name: 'Sales_Lead_Cover_Letter',
      type: 'cover-letter',
      format: 'PDF',
      size: '142 KB',
      downloadDate: new Date(Date.now() - 950400000).toISOString(),
      template: 'Bold',
      views: 22,
      starred: true,
      color: 'blue',
      url: '#'
    },
    {
      id: 'sample-14',
      name: 'Medical_Resident_CV',
      type: 'cv',
      format: 'PDF',
      size: '310 KB',
      downloadDate: new Date(Date.now() - 1036800000).toISOString(),
      template: 'Professional White',
      views: 17,
      starred: false,
      color: 'purple',
      url: '#'
    },
    {
      id: 'sample-15',
      name: 'Data_Scientist_Resume',
      type: 'resume',
      format: 'PDF',
      size: '280 KB',
      downloadDate: new Date(Date.now() - 1123200000).toISOString(),
      template: 'Tech Modern',
      views: 67,
      starred: true,
      color: 'blue',
      url: '#'
    },
    {
      id: 'sample-16',
      name: 'Human_Resources_Cover_Letter',
      type: 'cover-letter',
      format: 'PDF',
      size: '135 KB',
      downloadDate: new Date(Date.now() - 1209600000).toISOString(),
      template: 'Corporate',
      views: 9,
      starred: false,
      color: 'purple',
      url: '#'
    },
    {
      id: 'sample-17',
      name: 'Legal_Associate_CV',
      type: 'cv',
      format: 'DOCX',
      size: '225 KB',
      downloadDate: new Date(Date.now() - 1296000000).toISOString(),
      template: 'Formal',
      views: 14,
      starred: false,
      color: 'green',
      url: '#'
    },
    {
      id: 'sample-18',
      name: 'Full_Stack_Dev_Resume',
      type: 'resume',
      format: 'PDF',
      size: '295 KB',
      downloadDate: new Date(Date.now() - 1382400000).toISOString(),
      template: 'Cyberpunk Tech',
      views: 120,
      starred: true,
      color: 'blue',
      url: '#'
    },
    {
      id: 'sample-19',
      name: 'Content_Strategist_Resume',
      type: 'resume',
      format: 'DOCX',
      size: '205 KB',
      downloadDate: new Date(Date.now() - 1468800000).toISOString(),
      template: 'Clean & Simple',
      views: 33,
      starred: false,
      color: 'green',
      url: '#'
    },
    {
      id: 'sample-20',
      name: 'Operations_Manager_CV',
      type: 'cv',
      format: 'PDF',
      size: '340 KB',
      downloadDate: new Date(Date.now() - 1555200000).toISOString(),
      template: 'Director Edition',
      views: 41,
      starred: true,
      color: 'purple',
      url: '#'
    }
  ];

  return sampleDownloads;
};

// Initialize sample data in localStorage if empty
export const initializeSampleData = () => {
  const existing = localStorage.getItem('resumeDownloads');
  if (!existing || JSON.parse(existing).length === 0) {
    const sampleData = generateSampleDownloads();
    localStorage.setItem('resumeDownloads', JSON.stringify(sampleData));
    return sampleData;
  }
  return JSON.parse(existing);
};
