import React from 'react'
import { useNavigate } from 'react-router-dom'
import UpToSkillsImg from '../assets/UptoSkills.webp'

export default function NavBar() {
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100 select-none">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 focus:outline-none"
          aria-label="Go to home"
        >
          <img src={UpToSkillsImg} alt="UptoSkills Logo" className="w-[140px]" />
        </button>
      </div>
    </nav>
  )
}
