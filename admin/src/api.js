const API_BASE = import.meta.env.VITE_API_URL || ''

export function getToken() {
  return localStorage.getItem('gl_admin_token')
}
export function setToken(t) {
  localStorage.setItem('gl_admin_token', t)
}
export function clearToken() {
  localStorage.removeItem('gl_admin_token')
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = { ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (res.status === 401) {
    clearToken()
    window.location.reload()
    return
  }
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }),

  me: () => request('/api/auth/me'),

  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/api/products${qs ? `?${qs}` : ''}`)
  },

  createProduct: (formData) =>
    request('/api/products', { method: 'POST', body: formData }),

  updateProduct: (id, formData) =>
    request(`/api/products/${id}`, { method: 'PUT', body: formData }),

  deleteProduct: (id) =>
    request(`/api/products/${id}`, { method: 'DELETE' }),
}

export function getImageUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${API_BASE}${path}`
}
