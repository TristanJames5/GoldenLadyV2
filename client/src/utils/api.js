const API_BASE = import.meta.env.VITE_API_URL || ''

export async function fetchProducts(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`${API_BASE}/api/products${qs ? `?${qs}` : ''}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export function getImageUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${API_BASE}${path}`
}

export const ORDER_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd8sju-h1h5GT9OJmm7v8Z4zIipC4quc0-f74oed1rTGRWBQw/viewform?usp=publish-editor'
