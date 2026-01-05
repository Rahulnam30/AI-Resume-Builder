import React from 'react'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}
