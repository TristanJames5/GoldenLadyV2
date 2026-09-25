import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { fetchProducts, ORDER_FORM_URL } from '../utils/api'

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchProducts({ featured: 'true' })
      .then(setFeatured)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-ornament" />
        <div className="hero-content">
          <div className="hero-eyebrow">Est. Fine Jewelry &amp; Accessories</div>
          <h1 className="hero-title">Golden Lady</h1>
          <p className="hero-tagline">
            Curated fine jewelry and timeless accessories for those who appreciate
            the quiet beauty of heirlooms.
          </p>
          <div className="hero-cta">
            <Link to="/jewelry" className="btn-primary">
              <span>Explore Jewelry</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="section story-section">
        <div className="container">
          <div className="story-inner">
            <div>
              <div className="section-label animate-in">Our Story</div>
              <blockquote className="story-quote animate-in">
                "Every piece you wear should feel like stepping into a warm, intimate boutique."
              </blockquote>
              <p className="story-text animate-in">
                At Golden Lady, we believe that every piece you wear should feel like stepping
                into a warm, intimate boutique bathed in amber light. Our curated selection of
                fine jewelry and accessories is arranged like art, ready to be discovered.
              </p>
              <br />
              <p className="story-text animate-in">
                We treat every item as an heirloom, not a commodity. Our collections are refined,
                tactile, and unhurried — designed for moments worth remembering.
              </p>
            </div>
            <div className="story-image-frame animate-in">
              <img
                src="/store-photo.jpg"
                alt="Golden Lady boutique interior"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
              />
              <div style={{display:'none',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',background:'rgba(201,168,76,0.05)',minHeight:'320px'}}>
                <div style={{textAlign:'center',color:'var(--gold)',opacity:0.5}}>
                  <div style={{fontSize:'3rem'}}>◆</div>
                  <div style={{fontFamily:'var(--font-ui)',fontSize:'0.65rem',letterSpacing:'3px',textTransform:'uppercase',marginTop:'12px'}}>Golden Lady</div>
                </div>
              </div>
              <div className="story-corner tl" />
              <div className="story-corner tr" />
              <div className="story-corner bl" />
              <div className="story-corner br" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section">
        <div className="container">
          <div className="section-label animate-in">Our Collection</div>
          <h2 className="section-title animate-in">
            Featured <em>Pieces</em>
          </h2>
          <div className="gold-divider animate-in"><div className="gold-divider-icon" /></div>
          <div className="products-grid">
            {loading ? (
              // Skeleton placeholders while loading
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="product-card animate-in" style={{animationDelay:`${i*0.1}s`}}>
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
                    <div style={{height:16,background:'var(--border)',borderRadius:4,marginBottom:8}} />
                    <div style={{height:12,background:'var(--border)',borderRadius:4,marginBottom:16,width:'40%'}} />
                    <div style={{height:44,background:'var(--border)',borderRadius:4}} />
                  </div>
                </div>
              ))
            ) : featured.length > 0 ? (
              featured.map(p => <ProductCard key={p.id} product={p} featured />)
            ) : (
              <div style={{gridColumn:'1/-1',textAlign:'center',padding:'40px 0',color:'var(--text-muted)'}}>
                No featured pieces at the moment.
              </div>
            )}
          </div>
          <div style={{textAlign:'center',marginTop:48}} className="animate-in">
            <Link to="/jewelry" className="btn-outline">View All Jewelry</Link>
          </div>
        </div>
      </section>

      {/* ── Custom Orders Banner ── */}
      <div className="custom-banner animate-in">
        <div className="custom-banner-content">
          <h2 className="custom-banner-title">Your Vision, Our Craft</h2>
          <p className="custom-banner-text">
            "Bring us your story. We'll bring it to life."
          </p>
          <Link to="/custom-orders" className="btn-primary">
            <span>Custom Orders</span>
          </Link>
        </div>
      </div>
    </>
  )
}
