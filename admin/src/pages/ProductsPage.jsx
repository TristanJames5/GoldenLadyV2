import { useEffect, useState, useRef } from 'react'
import AdminLayout from '../components/AdminLayout'
import { api, getImageUrl } from '../api'

const CATEGORIES = {
  jewelry: ['necklaces', 'rings', 'earrings', 'pendants'],
  accessories: ['pins', 'rings'],
}

const EMPTY_FORM = {
  name: '', category: 'jewelry', subcategory: 'necklaces',
  price: '', description: '', featured: false
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t) }, [])
  return <div className="toast">{msg}</div>
}

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product ? { ...product, price: String(product.price) } : EMPTY_FORM)
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(product?.image ? getImageUrl(product.image) : null)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (imageFile) fd.append('image', imageFile)
      if (product) {
        await api.updateProduct(product.id, fd)
      } else {
        await api.createProduct(fd)
      }
      onSave()
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  // Update subcategory when category changes
  const handleCategoryChange = (v) => {
    set('category', v)
    set('subcategory', CATEGORIES[v][0])
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{product ? 'Edit Product' : 'Add Product'}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field full">
              <label>Product Name</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="e.g. Gold Filigree Necklace" />
            </div>

            <div className="form-field">
              <label>Category</label>
              <select value={form.category} onChange={e => handleCategoryChange(e.target.value)}>
                <option value="jewelry">Jewelry</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div className="form-field">
              <label>Subcategory</label>
              <select value={form.subcategory} onChange={e => set('subcategory', e.target.value)}>
                {CATEGORIES[form.category].map(s => (
                  <option key={s} value={s} style={{textTransform:'capitalize'}}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Price (₱)</label>
              <input type="number" min="0" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} required placeholder="0.00" />
            </div>

            <div className="form-field" style={{alignItems:'flex-start',justifyContent:'center'}}>
              <label>&nbsp;</label>
              <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',textTransform:'none',letterSpacing:'normal',fontSize:'0.82rem',marginTop:10}}>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => set('featured', e.target.checked)}
                  style={{width:16,height:16}}
                />
                Mark as Featured (shows on homepage)
              </label>
            </div>

            <div className="form-field full">
              <label>Description</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Brief product description..." rows={3} />
            </div>

            <div className="form-field full">
              <label>Product Image</label>
              <div className="img-upload" onClick={() => fileRef.current.click()}>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} />
                {preview ? (
                  <>
                    <img src={preview} alt="preview" className="img-preview" />
                    <div style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>Click to change image</div>
                  </>
                ) : (
                  <div>
                    <div style={{fontSize:'2rem',marginBottom:8,opacity:0.4}}>📷</div>
                    <div style={{fontSize:'0.8rem',color:'var(--text-muted)'}}>Click to upload product image</div>
                    <div style={{fontSize:'0.68rem',color:'var(--text-muted)',marginTop:4}}>JPG, PNG, WebP — max 10MB</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-gold" disabled={saving}>
              {saving ? 'Saving…' : (product ? 'Update Product' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ category: '', subcategory: '' })
  const [modal, setModal] = useState(null) // null | 'add' | product
  const [toast, setToast] = useState('')

  const load = () => {
    setLoading(true)
    const params = {}
    if (filter.category) params.category = filter.category
    if (filter.subcategory) params.subcategory = filter.subcategory
    api.getProducts(params)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(load, [filter])

  const handleSave = () => {
    setModal(null)
    setToast(modal === 'add' ? '✓ Product added' : '✓ Product updated')
    load()
  }

  const handleDelete = async (p) => {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return
    try {
      await api.deleteProduct(p.id)
      setToast('✓ Product deleted')
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <AdminLayout title="Products">
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}
      {modal && (
        <ProductModal
          product={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* Header */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24,gap:16,flexWrap:'wrap'}}>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <select
            value={filter.category}
            onChange={e => setFilter({category:e.target.value,subcategory:''})}
            style={{width:'auto',padding:'8px 12px'}}
          >
            <option value="">All Categories</option>
            <option value="jewelry">Jewelry</option>
            <option value="accessories">Accessories</option>
          </select>
          {filter.category && (
            <select
              value={filter.subcategory}
              onChange={e => setFilter(f=>({...f,subcategory:e.target.value}))}
              style={{width:'auto',padding:'8px 12px'}}
            >
              <option value="">All Subcategories</option>
              {CATEGORIES[filter.category]?.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>
              ))}
            </select>
          )}
        </div>
        <button className="btn btn-gold" onClick={() => setModal('add')}>
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="card" style={{marginBottom:0}}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{textAlign:'center',padding:'40px',color:'var(--text-muted)'}}>Loading…</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} style={{textAlign:'center',padding:'40px',color:'var(--text-muted)'}}>
                  No products found.
                  <button className="btn btn-gold btn-sm" onClick={() => setModal('add')} style={{marginLeft:12}}>Add one</button>
                </td></tr>
              ) : products.map(p => (
                <tr key={p.id}>
                  <td>
                    {getImageUrl(p.image) ? (
                      <img src={getImageUrl(p.image)} alt={p.name} className="td-img" />
                    ) : (
                      <div className="td-img-placeholder">◆</div>
                    )}
                  </td>
                  <td style={{fontWeight:500,maxWidth:200}}>{p.name}</td>
                  <td style={{textTransform:'capitalize',color:'var(--text-muted)',fontSize:'0.75rem'}}>
                    {p.category}<br />{p.subcategory}
                  </td>
                  <td>₱{Number(p.price).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${p.featured ? 'badge-gold' : 'badge-dark'}`}>
                      {p.featured ? '★ Featured' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <div style={{display:'flex',gap:8}}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setModal(p)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
