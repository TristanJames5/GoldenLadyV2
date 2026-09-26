import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../utils/api'

const ACCESSORIES_CATALOG = [
  /* Bracelets */
  { id: 'br-s1', category: 'accessories', subcategory: 'bracelets', name: 'Silver Bracelet — 999', price: 2200, description: '999 fine silver bracelet — pure elegance for every occasion.', image: null, localImg: '/catalog/Bracelet__silver_0.png' },
  { id: 'br-s2', category: 'accessories', subcategory: 'bracelets', name: 'Silver Bracelet II', price: 2400, description: 'Fine silver link bracelet — delicate craftsmanship, everyday wear.', image: null, localImg: '/catalog/Bracelet__silver_1.png' },
  { id: 'br-s3', category: 'accessories', subcategory: 'bracelets', name: 'Anchor Chain Bracelet', price: 2600, description: 'Nautical-inspired anchor chain — bold, refined statement piece.', image: null, localImg: '/catalog/Bracelet__silver_2.png' },
  { id: 'br-s4', category: 'accessories', subcategory: 'bracelets', name: 'Tennis Bracelet', price: 4500, description: 'Classic tennis bracelet with brilliant stones — timeless sophistication.', image: null, localImg: '/catalog/Bracelet__silver_3.png' },
  /* Pins */
  { id: 'pin-1', category: 'accessories', subcategory: 'pins', name: 'Decorative Pin I', price: 650, description: 'Handcrafted decorative pin — an elegant finishing touch.', image: null, localImg: '/catalog/Pins_0.png' },
  { id: 'pin-2', category: 'accessories', subcategory: 'pins', name: 'Decorative Pin II', price: 680, description: 'Fine detailing in a compact pin — understated and refined.', image: null, localImg: '/catalog/Pins_1.png' },
  { id: 'pin-3', category: 'accessories', subcategory: 'pins', name: 'Decorative Pin III', price: 700, description: 'A classic pin design with artisan gold-toned finish.', image: null, localImg: '/catalog/Pins_2.png' },
  { id: 'pin-4', category: 'accessories', subcategory: 'pins', name: 'Decorative Pin IV', price: 720, description: 'Precision pin craft — beautiful as a gift or personal accessory.', image: null, localImg: '/catalog/Pins_3.png' },
]

const SUBS = [
  { key: 'all',        label: 'All Accessories' },
  { key: 'bracelets',  label: 'Bracelets' },
  { key: 'pins',       label: 'Pins' },
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
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => { setProducts([]); setLoading(false) })
  }, [active])

  const localItems = ACCESSORIES_CATALOG.filter(
    i => active === 'all' || i.subcategory === active
  )
  const displayItems = products.length > 0
    ? products
    : localItems.map(i => ({ ...i, image: i.localImg }))

  return (
    <>
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="overline animate-in">Our Collection</div>
          <h1 className="section-title animate-in" style={{ marginBottom: 0 }}>
            Fine <em>Accessories</em>
          </h1>
          <div className="gem-divider animate-in" style={{ maxWidth: 200, margin: '16px auto' }}>
            <div className="gem" />
          </div>
          <p className="section-sub animate-in" style={{ margin: '0 auto' }}>
            Bracelets, pins, and refined accessories that complete every look
            with a touch of Golden Lady elegance.
          </p>
        </div>
      </div>

      <section className="inner-section">
        <div className="container">
          <div className="tabs-row" role="tablist" aria-label="Accessories categories">
            {SUBS.map(s => (
              <button
                key={s.key}
                role="tab"
                aria-selected={active === s.key}
                className={`tab-btn${active === s.key ? ' active' : ''}`}
                onClick={() => navigate(s.key === 'all' ? '/accessories' : `/accessories/${s.key}`)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="products-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="product-card">
                  <div className="product-image-wrap skeleton" style={{ aspectRatio: '3/4' }} />
                  <div className="product-info">
                    <div className="skeleton" style={{ height: 18, marginBottom: 8, width: '60%' }} />
                    <div className="skeleton" style={{ height: 36, marginTop: 16 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : displayItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">◆</div>
              <div className="empty-state-text">New accessories coming soon</div>
            </div>
          ) : (
            <div className="products-grid">
              {displayItems.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
