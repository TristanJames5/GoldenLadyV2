import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const ORDER_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSd8sju-h1h5GT9OJmm7v8Z4zIipC4quc0-f74oed1rTGRWBQw/viewform?usp=publish-editor'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            {/* Brand */}
            <Link to="/" className="brand-block">
              {/* Placeholder — replace with actual logo at src/assets/brand/logo.png */}
              <div className="brand-logo-placeholder">GL</div>
              <div className="brand-text">
                <span className="brand-name">Golden Lady</span>
                <span className="brand-tagline">Fine Jewelry &amp; Accessories</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className={`main-nav${mobileOpen ? ' mobile-open' : ''}`}>
              <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>
                Home
              </NavLink>

              <div className="nav-item">
                <NavLink to="/jewelry" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  Jewelry
                  <svg className="nav-chevron" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </NavLink>
                <div className="nav-dropdown">
                  <Link to="/jewelry/necklaces">Necklaces</Link>
                  <Link to="/jewelry/rings">Rings</Link>
                  <Link to="/jewelry/earrings">Earrings</Link>
                  <Link to="/jewelry/pendants">Pendants</Link>
                </div>
              </div>

              <div className="nav-item">
                <NavLink to="/accessories" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  Accessories
                  <svg className="nav-chevron" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </NavLink>
                <div className="nav-dropdown">
                  <Link to="/accessories/pins">Pins</Link>
                  <Link to="/accessories/rings">Rings</Link>
                </div>
              </div>

              <NavLink to="/custom-orders" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Custom Orders
              </NavLink>

              <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Contact
              </NavLink>
            </nav>

            {/* Mobile Burger */}
            <button
              className={`mobile-menu-btn${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className="header-gold-line" />
      </header>
    </>
  )
}
