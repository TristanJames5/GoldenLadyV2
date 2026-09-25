import { getImageUrl, ORDER_FORM_URL } from '../utils/api'

const JEWELRY_ICON = (
  <svg viewBox="0 0 48 48" fill="none" className="product-placeholder-icon">
    <path d="M24 8L32 18H16L24 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M16 18L20 38H28L32 18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M20 38L24 42L28 38" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)

export default function ProductCard({ product, featured = false }) {
  const imageUrl = getImageUrl(product.image)

  const handleOrder = (e) => {
    e.stopPropagation()
    const formUrl = `${ORDER_FORM_URL}`
    window.open(formUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="product-card animate-in">
      <div className="product-image-wrap">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-placeholder">
            {JEWELRY_ICON}
            <span className="product-placeholder-text">Image Coming Soon</span>
          </div>
        )}
        {featured && <div className="product-badge">Featured</div>}
      </div>
      <div className="product-info">
        <div className="product-sub">{product.subcategory}</div>
        <div className="product-name">{product.name}</div>
        {product.description && (
          <div className="product-desc">{product.description}</div>
        )}
        <div className="product-price">
          ₱{Number(product.price).toLocaleString()}
        </div>
        <button className="btn-order" onClick={handleOrder}>
          Order Now
        </button>
      </div>
    </div>
  )
}
