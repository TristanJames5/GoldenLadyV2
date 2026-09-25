import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../utils/api'

const SUBS = [
  { key: 'all', label: 'All Accessories' },
  { key: 'pins', label: 'Pins' },
  { key: 'rings', label: 'Rings' },
]

export default function AccessoriesPage() {
  const { sub } = useParams()
  const navigate = useNavigate()
  const active = sub || 'all'
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = { category: 'accessories' }
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
          <div className="section-label animate-in">Collection</div>
          <h1 className="section-title animate-in" style={{marginBottom:0}}>
            <em>Accessories</em>
          </h1>
          <div className="gold-divider animate-in" style={{maxWidth:300,margin:'16px auto'}}>
            <div className="gold-divider-icon" />
          </div>
          <p className="section-body animate-in" style={{margin:'0 auto',textAlign:'center'}}>
            Masonic pins and rings crafted with precision and pride.
            Each piece carries meaning beyond its beauty.
          </p>
        </div>
      </div>

      <section className="section" style={{paddingTop:60}}>
        <div className="container">
          <div className="subcategory-tabs">
            {SUBS.map(s => (
              <button
                key={s.key}
                className={`subcategory-tab${active === s.key ? ' active' : ''}`}
                onClick={() => navigate(s.key === 'all' ? '/accessories' : `/accessories/${s.key}`)}
              >
                {s.label}
                {s.key === 'pins' && <span style={{marginLeft:8,fontSize:'0.6rem',color:'var(--gold)',fontFamily:'var(--font-ui)'}}>₱250</span>}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="products-grid">
              {Array.from({length:4}).map((_,i)=>(
                <div key={i} className="product-card">
                  <div className="product-image-wrap" style={{background:'var(--cream-dark)'}}>
                    <div className="product-placeholder">
                      <svg viewBox="0 0 48 48" fill="none" className="product-placeholder-icon">
                        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5"/>
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

          {/* Masonic note */}
          {(active === 'all' || active === 'pins') && (
            <div className="animate-in" style={{
              marginTop:56,padding:'32px 40px',
              background:'var(--white)',border:'1px solid var(--border)',
              borderLeft:'3px solid var(--gold)'
            }}>
              <div className="section-label" style={{marginBottom:8}}>Masonic Collection</div>
              <p style={{color:'var(--text-muted)',lineHeight:1.8,fontSize:'0.95rem'}}>
                Our Masonic pins are priced at <strong style={{color:'var(--gold-dark)'}}>₱250 each</strong>.
                Masonic rings are available at variable prices depending on metal, size, and lodge symbol.
                Contact us for custom lodge designs and bulk orders.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
