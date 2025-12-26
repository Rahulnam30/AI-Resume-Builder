import { useState } from 'react'
import Home from './pages/Home'
import TemplatesPage from './pages/TemplatesPage'
//import login from'./pages/login'
// Import your ResumeBuilder component here when ready
// import ResumeBuilder from './pages/ResumeBuilder'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const navigateToHome = () => {
    setCurrentPage('home')
  }

  const navigateToTemplates = () => {
    setCurrentPage('templates')
  }

  const navigateToBuilder = (template) => {
    setSelectedTemplate(template)
    setCurrentPage('builder')
    // TODO: Once you create the ResumeBuilder page, uncomment the line above
    // For now, you can show an alert or keep it on templates page
    console.log('Navigating to builder with template:', template)
  }

  const handleSelectTemplate = (template) => {
    console.log('Selected template:', template)
    setSelectedTemplate(template)
  }

  return (
    <div className="app">
      {/* HOME PAGE */}
      {currentPage === 'home' && (
        <Home
          onNavigateToTemplates={navigateToTemplates}
        />
      )}

      {/* TEMPLATES PAGE */}
      {currentPage === 'templates' && (
        <TemplatesPage 
          onNavigateHome={navigateToHome}
          onSelectTemplate={handleSelectTemplate}
          onNavigateToBuilder={navigateToBuilder}
        />
      )}

      {/* RESUME BUILDER PAGE */}
      {currentPage === 'builder' && (
        <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#1a2e52] text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Resume Builder Coming Soon! 🚀
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              You selected: <span className="text-[#00d9ff]">{selectedTemplate?.name}</span>
            </p>
            <button
              onClick={navigateToTemplates}
              className="px-8 py-4 bg-gradient-to-r from-[#ff6b3d] to-[#ff5722] text-white font-bold rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              ← Back to Templates
            </button>
          </div>
        </div>
        // TODO: Replace above placeholder with your actual ResumeBuilder component:
        // <ResumeBuilder 
        //   template={selectedTemplate}
        //   onNavigateBack={navigateToTemplates}
        // />
      )}
    </div>
  )
}

export default App