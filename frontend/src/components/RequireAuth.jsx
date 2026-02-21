import React from 'react'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children, allowedRoles }) {
  const token = localStorage.getItem('token')
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false')

  // ❌ No token → go to login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // ✅ If roles are specified, check role
  if (allowedRoles && allowedRoles.length > 0) {
    if (allowedRoles.includes('admin') && isAdmin) {
      return children
    }

    if (allowedRoles.includes('user') && !isAdmin) {
      return children
    }

    // ❌ Role mismatch → redirect properly
    return <Navigate to={isAdmin ? "/admin" : "/user/dashboard"} replace />
  }

  // ✅ If no role restriction
  return children
}