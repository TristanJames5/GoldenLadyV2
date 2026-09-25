import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <div>
            <div className="footer-brand-name">Golden Lady</div>
            <p className="footer-tagline">
              Curated fine jewelry and timeless accessories for those who<br />
              appreciate the quiet beauty of heirlooms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-heading">Explore</div>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jewelry">Jewelry</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
              <li><Link to="/custom-orders">Custom Orders</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-heading">Get in Touch</div>
            <ul className="footer-links">
              <li><a href="tel:+639954889011">+63 995 488 9011</a></li>
              <li><a href="mailto:emandalican@icloud.com">emandalican@icloud.com</a></li>
              <li><span style={{opacity:0.5}}>Viber / WhatsApp</span></li>
              <li>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd8sju-h1h5GT9OJmm7v8Z4zIipC4quc0-f74oed1rTGRWBQw/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Form ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Golden Lady. All rights reserved.</span>
          <span>Crafted with love. Made to be remembered.</span>
        </div>
      </div>
    </footer>
  )
}
