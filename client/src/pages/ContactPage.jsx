import { ORDER_FORM_URL } from '../utils/api'

const CONTACTS = [
  { icon: '📞', label: 'Phone / Viber / WhatsApp', value: '+63 995 488 9011', href: 'tel:+639954889011' },
  { icon: '✉️', label: 'Email', value: 'Goldenladyjewelry8@gmail.com', href: 'mailto:Goldenladyjewelry8@gmail.com' },
  { icon: '📸', label: 'Instagram', value: '@GoldenLadyJewelry', href: 'https://instagram.com/GoldenLadyJewelry' },
  { icon: '📘', label: 'Facebook', value: 'Golden Lady Jewelry', href: 'https://facebook.com/GoldenLadyJewelry' },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <div className="page-hero" style={{ background: 'var(--cream)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
        <div className="container page-hero-content">
          <div className="overline dark animate-in">We'd Love to Hear From You</div>
          <h1 className="section-title animate-in" style={{ marginBottom: 0, color: '#1a1410' }}>
            <em>Contact</em> Us
          </h1>
          <div className="gem-divider animate-in" style={{ maxWidth: 200, margin: '16px auto' }}>
            <div className="gem" style={{ background: 'rgba(201,168,76,0.8)' }} />
          </div>
          <p className="section-sub animate-in" style={{ margin: '0 auto', color: 'rgba(26,20,16,0.6)' }}>
            Reach out via phone, Viber, WhatsApp, email, or our socials — we're here
            to help you find or create the perfect piece.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <section className="contact-section" style={{ paddingTop: 72 }}>
        <div className="container">
          <div className="contact-layout" style={{ marginTop: 0 }}>
            {/* Left — contact cards */}
            <div>
              <div className="overline dark animate-in" style={{ marginBottom: 24 }}>Reach Us</div>
              <div className="contact-cards-grid animate-in">
                {CONTACTS.map(c => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="contact-card"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="contact-card-icon">{c.icon}</div>
                    <div className="contact-card-label">{c.label}</div>
                    <div className="contact-card-value">{c.value}</div>
                  </a>
                ))}
              </div>

              {/* Store info */}
              <div style={{ marginTop: 32 }} className="animate-in">
                <div className="overline dark" style={{ marginBottom: 16 }}>Our Store</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Location', value: '2nd Floor, Bldg A, SM Megamall\nWack-Wack Greenhills, Mandaluyong City\nMetro Manila, Philippines' },
                    { label: 'Hours', value: 'Mon – Sun, 10:00 AM – 8:00 PM' },
                  ].map(r => (
                    <div key={r.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold-dark)', minWidth: 80, paddingTop: 2 }}>
                        {r.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(26,20,16,0.88)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                        {r.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — process */}
            <div className="animate-in">
              <div className="overline dark">How We Work</div>
              <h2 className="contact-right-title">
                Simple, <em>personal</em> service
              </h2>
              <div className="process-divider">
                <div className="gem" />
              </div>
              <div className="timeline">
                {[
                  'Click Order Now on any product',
                  'Fill in your details and preferences',
                  'We contact you via Viber or Messenger',
                  'Arrange payment securely',
                  'We ship directly to you',
                ].map((step, i, arr) => (
                  <div key={i} className="timeline-step">
                    <div className="timeline-left">
                      <div className="timeline-circle">{i + 1}</div>
                      {i < arr.length - 1 && <div className="timeline-connector" />}
                    </div>
                    <div className="timeline-text">{step}</div>
                  </div>
                ))}
              </div>
              <div className="payment-block">
                <div className="payment-label">Payment Methods</div>
                <div className="payment-methods">GCash • PayMaya • Bank Transfer</div>
              </div>

              <div style={{ marginTop: 32 }}>
                <a
                  href={ORDER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'inline-flex', background: '#C9A84C', color: '#0c0a07' }}
                >
                  Place an Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
