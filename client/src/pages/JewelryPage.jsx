import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { fetchProducts, ORDER_FORM_URL } from '../utils/api'

const GemDivider = () => (
  <div className="gem-divider"><div className="gem" /></div>
)

/* Fallback catalog data with real extracted images */
const JEWELRY_CATALOG = [
  /* Necklaces - Gold */
  { id: 'nk-g1', category: 'jewelry', subcategory: 'necklaces', name: '14k Gold Necklace — 45cm', price: 4500, description: 'Classic 14k gold chain, 45cm — lightweight and timeless.', image: null, localImg: '/catalog/Necklace__Gold_0.png' },
  { id: 'nk-g2', category: 'jewelry', subcategory: 'necklaces', name: '14k Gold Necklace — 50cm', price: 4800, description: '14k gold chain, 50cm — a longer silhouette for layering.', image: null, localImg: '/catalog/Necklace__Gold_2.png' },
  { id: 'nk-g3', category: 'jewelry', subcategory: 'necklaces', name: '18k Gold Necklace — 16"', price: 6800, description: '18k yellow gold necklace, 16 inches — lustrous and heirloom-quality.', image: null, localImg: '/catalog/Necklace__Gold_1.png' },
  { id: 'nk-g4', category: 'jewelry', subcategory: 'necklaces', name: '18k Gold VVS — 16"', price: 8500, description: '18k gold necklace with VVS stones — pure brilliance at every angle.', image: null, localImg: '/catalog/Necklace__Gold_3.png' },
  /* Necklaces - Silver */
  { id: 'nk-s1', category: 'jewelry', subcategory: 'necklaces', name: '925 Silver Necklace', price: 1800, description: 'Sterling silver chain — elegant, lightweight everyday luxury.', image: null, localImg: '/catalog/Necklace__Silver_0.png' },
  { id: 'nk-s2', category: 'jewelry', subcategory: 'necklaces', name: '925 Silver Necklace II', price: 1900, description: 'Fine 925 sterling silver — polished to a brilliant sheen.', image: null, localImg: '/catalog/Necklace__Silver_1.png' },
  /* Rings */
  { id: 'rg-s1', category: 'jewelry', subcategory: 'rings', name: '925 CZ Silver Ring', price: 1500, description: 'Sterling silver with CZ stones — brilliant sparkle, everyday wear.', image: null, localImg: '/catalog/Rings__Silver_0.png' },
  { id: 'rg-s2', category: 'jewelry', subcategory: 'rings', name: '925 Silver Ring II', price: 1600, description: '925 silver band with detailed craftsmanship and fine finish.', image: null, localImg: '/catalog/Rings__Silver_1.png' },
  { id: 'rg-w1', category: 'jewelry', subcategory: 'rings', name: 'Wedding Band — Classic', price: 12000, description: 'A timeless handcrafted wedding band — worn for a lifetime.', image: null, localImg: '/catalog/Rings__Wedding_ring_0.png' },
  { id: 'rg-w2', category: 'jewelry', subcategory: 'rings', name: 'Wedding Band — Elegant', price: 14500, description: 'Elegant wedding band with refined detailing — crafted with love.', image: null, localImg: '/catalog/Rings__Wedding_ring_1.png' },
  /* Pendants - White Gold */
  { id: 'pd-wg1', category: 'jewelry', subcategory: 'pendants', name: '14k White Gold Pendant', price: 5200, description: 'Fine 14k white gold pendant — intricate craftsmanship, striking elegance.', image: null, localImg: '/catalog/Pendants__White_gold_0.png' },
  { id: 'pd-wg2', category: 'jewelry', subcategory: 'pendants', name: '14k White Gold Pendant II', price: 5500, description: 'Artisan-crafted white gold pendant with extraordinary attention to detail.', image: null, localImg: '/catalog/Pendants__White_gold_1.png' },
  { id: 'pd-wg3', category: 'jewelry', subcategory: 'pendants', name: '14k White Gold Pendant III', price: 5800, description: 'Stunning 14k white gold — beautifully sculptural and wearable daily.', image: null, localImg: '/catalog/Pendants__White_gold_2.png' },
  /* Pendants - Yellow Gold */
  { id: 'pd-yg1', category: 'jewelry', subcategory: 'pendants', name: '18k Yellow Gold Pendant', price: 7500, description: '18k yellow gold pendant — radiant warmth and artisan detail.', image: null, localImg: '/catalog/Pendants__Yellow_gold_0.png' },
  { id: 'pd-yg2', category: 'jewelry', subcategory: 'pendants', name: '18k Yellow Gold Pendant II', price: 7800, description: 'Rich 18k gold pendant — the warmth of tradition in modern form.', image: null, localImg: '/catalog/Pendants__Yellow_gold_1.png' },
  /* Pendants - Silver */
  { id: 'pd-s1', category: 'jewelry', subcategory: 'pendants', name: '925 Silver Pendant', price: 2200, description: 'Sterling silver pendant — refined simplicity for everyday elegance.', image: null, localImg: '/catalog/Pendants__Silver_0.png' },
]

const SUBS = [
  { key: 'all',      label: 'All Jewelry' },
  { key: 'necklaces', label: 'Necklaces' },
  { key: 'rings',    label: 'Rings' },
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
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => { setProducts([]); setLoading(false) })
  }, [active])

  // Merge API products with local catalog fallbacks
  const localItems = JEWELRY_CATALOG.filter(
    i => active === 'all' || i.subcategory === active
  )

  const displayItems = products.length > 0
    ? products
    : localItems.map(i => ({ ...i, image: i.localImg }))

  return (
    <>
      {/* Page hero */}
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="overline animate-in">Our Collection</div>
          <h1 className="section-title animate-in" style={{ marginBottom: 0 }}>
            Fine <em>Jewelry</em>
          </h1>
          <div className="gem-divider animate-in" style={{ maxWidth: 200, margin: '16px auto' }}>
            <div className="gem" />
          </div>
          <p className="section-sub animate-in" style={{ margin: '0 auto' }}>
            Handcrafted pieces that tell your story. Each item selected for its
            craftsmanship, beauty, and lasting quality.
          </p>
        </div>
      </div>

      {/* Products */}
      <section className="inner-section">
        <div className="container">
          {/* Tabs */}
          <div className="tabs-row" role="tablist" aria-label="Jewelry categories">
            {SUBS.map(s => (
              <button
                key={s.key}
                role="tab"
                aria-selected={active === s.key}
                className={`tab-btn${active === s.key ? ' active' : ''}`}
                onClick={() => navigate(s.key === 'all' ? '/jewelry' : `/jewelry/${s.key}`)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="products-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="product-card">
                  <div className="product-image-wrap skeleton" style={{ aspectRatio: '3/4' }} />
                  <div className="product-info">
                    <div className="skeleton" style={{ height: 18, marginBottom: 8, width: '60%' }} />
                    <div className="skeleton" style={{ height: 12, marginBottom: 16, width: '40%' }} />
                    <div className="skeleton" style={{ height: 36 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : displayItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">◆</div>
              <div className="empty-state-text">New pieces coming soon</div>
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
