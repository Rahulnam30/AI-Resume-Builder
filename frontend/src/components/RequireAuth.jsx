import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children, allowedRoles }) {
  const [isChecking, setIsChecking] = useState(true)
  const [hasToken, setHasToken] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Check BOTH localStorage and sessionStorage
    const token =
      localStorage.getItem('token') ||
      sessionStorage.getItem('token')

    const storedRole =
      localStorage.getItem('isAdmin') ||
      sessionStorage.getItem('isAdmin')

    const isAdmin = JSON.parse(storedRole || 'false')

    setHasToken(!!token)

    if (token) {
      if (allowedRoles && allowedRoles.length > 0) {
        if (allowedRoles.includes('admin') && isAdmin) {
          setIsAuthorized(true)
        } else if (allowedRoles.includes('user') && !isAdmin) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      } else {
        // No role restriction, only token required
        setIsAuthorized(true)
      }
    }

    setIsChecking(false)
  }, [allowedRoles])

  if (isChecking) {
    return null // or a loading spinner
  }

  // ❌ No token → go to login
  if (!hasToken) {
    return <Navigate to="/login" replace />
  }

  // ❌ Role mismatch → redirect based on role
  if (!isAuthorized) {
    const storedRole =
      localStorage.getItem('isAdmin') ||
      sessionStorage.getItem('isAdmin')

    const isAdmin = JSON.parse(storedRole || 'false')

    return (
      <Navigate
        to={isAdmin ? "/admin" : "/user/dashboard"}
        replace
      />
    )
  }

  // ✅ Authorized
  return children
}