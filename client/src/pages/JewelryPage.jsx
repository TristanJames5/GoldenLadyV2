import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../utils/api'

const SUBS = [
  { key: 'all', label: 'All Jewelry' },
  { key: 'necklaces', label: 'Necklaces' },
  { key: 'rings', label: 'Rings' },
  { key: 'earrings', label: 'Earrings' },
  { key: 'pendants', label: 'Pendants' },
]

export default function JewelryPage() {
  const { sub } = useParams()
  const navigate = useNavigate()
  const active = sub || 'all'
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = { category: 'jewelry' }
    if (active !== 'all') params.subcategory = active
    fetchProducts(params)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [active])

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="section-label animate-in">Our Collection</div>
          <h1 className="section-title animate-in" style={{marginBottom:0}}>
            Fine <em>Jewelry</em>
          </h1>
          <div className="gold-divider animate-in" style={{maxWidth:300,margin:'16px auto'}}>
            <div className="gold-divider-icon" />
          </div>
          <p className="section-body animate-in" style={{margin:'0 auto',textAlign:'center'}}>
            Handcrafted pieces that tell your story. Each item is selected for its
            craftsmanship, beauty, and lasting quality.
          </p>
        </div>
      </div>

      <section className="section" style={{paddingTop:60}}>
        <div className="container">
          {/* Subcategory Tabs */}
          <div className="subcategory-tabs">
            {SUBS.map(s => (
              <button
                key={s.key}
                className={`subcategory-tab${active === s.key ? ' active' : ''}`}
                onClick={() => navigate(s.key === 'all' ? '/jewelry' : `/jewelry/${s.key}`)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Products */}
          {loading ? (
            <div className="products-grid">
              {Array.from({length:4}).map((_,i)=>(
                <div key={i} className="product-card">
                  <div className="product-image-wrap" style={{background:'var(--cream-dark)'}}>
                    <div className="product-placeholder">
                      <svg viewBox="0 0 48 48" fill="none" className="product-placeholder-icon">
                        <path d="M24 8L32 18H16L24 8Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M16 18L20 38H28L32 18" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                  <div className="product-info">
                    <div style={{height:10,background:'var(--border)',borderRadius:4,marginBottom:8,width:'60%'}} />
                    <div style={{height:16,background:'var(--border)',borderRadius:4,marginBottom:16}} />
                    <div style={{height:44,background:'var(--border)',borderRadius:4}} />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div style={{textAlign:'center',padding:'80px 0',color:'var(--text-muted)'}}>
              <div style={{fontSize:'3rem',marginBottom:16,opacity:0.3}}>◆</div>
              <p style={{fontFamily:'var(--font-ui)',letterSpacing:'2px',fontSize:'0.8rem',textTransform:'uppercase'}}>
                New pieces coming soon
              </p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
