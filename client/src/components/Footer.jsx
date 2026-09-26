import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top-rule" />
      <div className="footer-inner">
        {/* Brand */}
        <div>
          <div className="brand-badge" style={{ width: 36, height: 36, fontSize: 12 }}>GL</div>
          <div className="footer-brand-name">Golden Lady</div>
          <p className="footer-brand-body">
            Fine jewelry and timeless accessories, crafted with love for generations.
          </p>
          {/* Social icons row */}
          <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
            <a
              href="https://instagram.com/GoldenLadyJewelry"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold)', opacity: 0.8, fontSize: 18, transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
              aria-label="Instagram"
            >📸</a>
            <a
              href="https://facebook.com/GoldenLadyJewelry"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold)', opacity: 0.8, fontSize: 18, transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
              aria-label="Facebook"
            >📘</a>
          </div>
        </div>

        {/* Center nav */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/jewelry">Jewelry</Link>
          <Link to="/accessories">Accessories</Link>
          <Link to="/custom-orders">Custom Orders</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Contact */}
        <div className="footer-contact">
          <div className="footer-contact-label">Get in Touch</div>
          <div className="footer-contact-info">
            <a href="tel:+639954889011">+63 995 488 9011</a><br />
            <a href="mailto:Goldenladyjewelry8@gmail.com">Goldenladyjewelry8@gmail.com</a><br /><br />
            <span style={{ fontSize: 12, color: 'var(--ivory-muted)', lineHeight: 1.6 }}>
              2nd Floor, Bldg A, SM Megamall<br />
              Mandaluyong City, Metro Manila<br />
              Mon – Sun · 10:00 AM – 8:00 PM
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">
          © {new Date().getFullYear()} Golden Lady Jewelry. All rights reserved.
        </span>
        <div className="footer-gem-row" aria-hidden="true">
          <div className="footer-gem-rule" />
          <div className="gem" />
          <div className="footer-gem-rule" />
        </div>
      </div>
    </footer>
  )
}
