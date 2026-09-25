import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { api } from '../api'

export default function DashboardPage() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.getProducts().then(setProducts).catch(console.error)
  }, [])

  const stats = {
    total: products.length,
    jewelry: products.filter(p => p.category === 'jewelry').length,
    accessories: products.filter(p => p.category === 'accessories').length,
    featured: products.filter(p => p.featured).length,
  }

  const recent = [...products].sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5)

  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div className="stats-grid">
        {[
          { num: stats.total, label: 'Total Products' },
          { num: stats.jewelry, label: 'Jewelry' },
          { num: stats.accessories, label: 'Accessories' },
          { num: stats.featured, label: 'Featured' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="card">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <div className="card-title" style={{marginBottom:0}}>Recent Products</div>
          <button className="btn btn-gold btn-sm" onClick={() => navigate('/admin/products')}>
            Manage All
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(p => (
                <tr key={p.id}>
                  <td style={{fontWeight:500}}>{p.name}</td>
                  <td style={{textTransform:'capitalize'}}>{p.category} / {p.subcategory}</td>
                  <td>₱{Number(p.price).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${p.featured ? 'badge-gold' : 'badge-dark'}`}>
                      {p.featured ? 'Featured' : 'Active'}
                    </span>
                  </td>
                  <td style={{color:'var(--text-muted)'}}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr><td colSpan={5} style={{textAlign:'center',padding:'32px',color:'var(--text-muted)'}}>No products yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick tips */}
      <div className="card">
        <div className="card-title">Quick Reference</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {[
            ['Masonic Pins', '₱250 each (fixed)'],
            ['Order Method', 'Google Form → you contact customer'],
            ['Payment', 'GCash, PayMaya, Bank Transfer'],
            ['Admin Login', 'emandalican@icloud.com'],
          ].map(([k,v]) => (
            <div key={k} style={{padding:'12px 16px',background:'var(--bg-3)',borderRadius:'var(--radius)'}}>
              <div style={{fontSize:'0.65rem',letterSpacing:'1.5px',textTransform:'uppercase',color:'var(--gold)',marginBottom:4}}>{k}</div>
              <div style={{fontSize:'0.82rem',color:'var(--text)'}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
