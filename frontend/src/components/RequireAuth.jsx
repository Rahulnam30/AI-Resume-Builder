import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const [isChecking, setIsChecking] = useState(true)
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setHasToken(!!token)
    setIsChecking(false)
  }, [])

  if (isChecking) {
    return null // Or a loading spinner
  }

  if (!hasToken) {
    return <Navigate to="/login" replace />
  }

  return children
}
