// Auto-generated assets index
// Exports a mapping from the asset filename (without extension) to its resolved URL
// Usage:
// import images from '../assets'
// images['logo'] -> '/assets/logo.png'
// or use getImage('logo') for safe access

const modules = import.meta.glob('./**/*.{png,jpg,jpeg,svg,gif,webp}', { eager: true })

const images = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const filename = path.split('/').pop()
    const key = filename.replace(/\.[^/.]+$/, '')
    // mod.default is the resolved URL in Vite
    return [key, mod.default]
  })
)

const BASE_URL = import.meta.env.BASE_URL || '/'

export function getImage(code, fallback = '') {
  // Normalize code: trim
  if (!code) return fallback
  const key = String(code).trim()
  // direct exact match
  if (images[key]) return images[key]
  // case-insensitive match
  const foundKey = Object.keys(images).find(k => k.toLowerCase() === key.toLowerCase())
  if (foundKey) return images[foundKey]

  // Fallback: look in public templates folder (support common extensions)
  const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif']
  for (const ext of exts) {
    // Use BASE_URL which points to public/ base
    const url = `${BASE_URL}templates/${key}.${ext}`
    // Return first constructed URL (we don't fetch at runtime)
    // This works when files exist under public/templates/*
    // If it doesn't exist, browser will show broken image; callers can provide their own fallback
    return url
  }

  return fallback
}

export default images
