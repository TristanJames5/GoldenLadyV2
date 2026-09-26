import { supabase } from './supabase'

export function getToken() {
  return localStorage.getItem('gl_admin_token')
}
export function setToken(t) {
  localStorage.setItem('gl_admin_token', t)
}
export function clearToken() {
  localStorage.removeItem('gl_admin_token')
}

export const api = {
  login: async (email, password) => {
    // Since RLS is off, we mock login to avoid setting up full Auth.
    if (email === 'emandalican@icloud.com' && password === 'GoldenLady@2024') {
      return { token: 'mock-supabase-token', user: { email } }
    }
    throw new Error('Invalid credentials')
  },

  me: async () => {
    const token = getToken()
    if (!token) throw new Error('Not logged in')
    return { user: { email: 'emandalican@icloud.com' } }
  },

  getProducts: async (params = {}) => {
    let query = supabase.from('products').select('*')
    if (params.category) query = query.eq('category', params.category)
    query = query.order('created_at', { ascending: false })
    const { data, error } = await query
    if (error) throw error
    return data
  },

  createProduct: async (formData) => {
    let imagePath = null
    const imageFile = formData.get('image')
    if (imageFile && imageFile.name) {
      const fileName = Date.now() + '_' + imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const { data, error } = await supabase.storage.from('products').upload(fileName, imageFile)
      if (error) throw error
      imagePath = data.path
    }

    const payload = {
      name: formData.get('name'),
      category: formData.get('category'),
      subcategory: formData.get('subcategory'),
      price: Number(formData.get('price')),
      description: formData.get('description'),
      featured: formData.get('featured') === 'true',
      image: imagePath
    }

    const { data, error } = await supabase.from('products').insert([payload]).select()
    if (error) throw error
    return data[0]
  },

  updateProduct: async (id, formData) => {
    let imagePath = formData.get('image') // might be a string (existing path) or File
    if (imagePath instanceof File && imagePath.name) {
      const fileName = Date.now() + '_' + imagePath.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const { data, error } = await supabase.storage.from('products').upload(fileName, imagePath)
      if (error) throw error
      imagePath = data.path
    } else if (!imagePath || imagePath === 'null') {
      imagePath = null // handle cleared image or untouched string
    }

    const payload = {
      name: formData.get('name'),
      category: formData.get('category'),
      subcategory: formData.get('subcategory'),
      price: Number(formData.get('price')),
      description: formData.get('description'),
      featured: formData.get('featured') === 'true',
    }
    // Only update image if it was changed
    if (formData.has('image') && imagePath !== 'null') payload.image = imagePath

    const { data, error } = await supabase.from('products').update(payload).eq('id', id).select()
    if (error) throw error
    return data[0]
  },

  deleteProduct: async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  },
}

export function getImageUrl(path) {
  if (!path || path === 'null') return null
  if (path.startsWith('http') || path.startsWith('/')) return path
  const { data } = supabase.storage.from('products').getPublicUrl(path)
  return data.publicUrl
}
