// Sample downloads data for demonstration
export const generateSampleDownloads = () => {
  const sampleDownloads = [
    {
      id: 'sample-1',
      name: 'Software_Engineer_Resume',
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
      name: 'Cover_Letter_Google',
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
      name: 'ATS_Optimized_Resume',
      type: 'resume',
      format: 'DOCX',
      size: '198 KB',
      downloadDate: new Date(Date.now() - 172800000).toISOString(),
      template: 'ATS Friendly',
      views: 24,
      starred: true,
      color: 'green',
      url: '#'
    },
    {
      id: 'sample-4',
      name: 'Data_Analyst_Resume',
      type: 'resume',
      format: 'PDF',
      size: '235 KB',
      downloadDate: new Date(Date.now() - 259200000).toISOString(),
      template: 'Creative',
      views: 15,
      starred: false,
      color: 'blue',
      url: '#'
    },
    {
      id: 'sample-5',
      name: 'Marketing_Manager_Resume',
      type: 'resume',
      format: 'PDF',
      size: '267 KB',
      downloadDate: new Date(Date.now() - 345600000).toISOString(),
      template: 'Executive',
      views: 19,
      starred: true,
      color: 'green',
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