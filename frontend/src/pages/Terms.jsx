import React, { useEffect } from 'react'
import UpToSkillsImg from '../assets/UptoSkills.webp'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer' 


export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 font-jakarta text-[#1a2e52]">
      <NavBar />
      <section className="relative min-h-[60vh] flex flex-col justify-center px-8 pt-20 pb-16 overflow-hidden bg-white border-b border-gray-100">
        <div className="relative z-10 w-full max-w-[900px] mx-auto text-center">
          <img src={UpToSkillsImg} alt="UptoSkills" className="w-32 mx-auto mb-6" />
          <h1 className="mb-4 text-4xl font-extrabold">Terms of Service</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">By using UptoSkills, you agree to our terms. This page summarizes the most important terms—please read the full version before using the service.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-6">By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy.</p>

        <h2 className="text-2xl font-bold mb-4">2. Use of the Service</h2>
        <p className="text-gray-600 mb-6">You are responsible for keeping your account secure and using the service in accordance with applicable laws.</p>

        <h2 className="text-2xl font-bold mb-4">3. Intellectual Property</h2>
        <p className="text-gray-600 mb-6">All content, designs, and trademarks are the property of UptoSkills unless otherwise stated.</p>

        <h2 className="text-2xl font-bold mb-4">4. Contact</h2>
        <p className="text-gray-600">If you have questions about these terms, please contact support via the Contact page.</p>
      </section>
      <Footer />
    </div>
  )
}

