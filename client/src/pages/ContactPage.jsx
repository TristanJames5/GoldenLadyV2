export default function ContactPage() {
  const contacts = [
    {
      icon: '📱',
      label: 'Phone / Viber / WhatsApp',
      value: '+63 995 488 9011',
      href: 'tel:+639954889011',
    },
    {
      icon: '✉️',
      label: 'Email',
      value: 'emandalican@icloud.com',
      href: 'mailto:emandalican@icloud.com',
    },
    {
      icon: '💬',
      label: 'Viber',
      value: '+63 995 488 9011',
      href: 'viber://chat?number=+639954889011',
    },
    {
      icon: '📲',
      label: 'WhatsApp',
      value: '+63 995 488 9011',
      href: 'https://wa.me/639954889011',
    },
  ]

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="section-label animate-in">We'd Love to Hear From You</div>
          <h1 className="section-title animate-in" style={{marginBottom:0}}>
            <em>Contact</em> Us
          </h1>
          <div className="gold-divider animate-in" style={{maxWidth:300,margin:'16px auto'}}>
            <div className="gold-divider-icon" />
          </div>
          <p className="section-body animate-in" style={{margin:'0 auto',textAlign:'center'}}>
            Whether you have a question, want to place a custom order, or simply want
            to know more about our pieces — we're here for you.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact cards */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
              {contacts.map(c => (
                <a key={c.label} href={c.href} className="contact-card animate-in" style={{textDecoration:'none',display:'block'}}>
                  <div className="contact-icon">{c.icon}</div>
                  <div className="contact-label">{c.label}</div>
                  <div className="contact-value">{c.value}</div>
                </a>
              ))}
            </div>

            {/* Info panel */}
            <div className="animate-in" style={{paddingLeft:8}}>
              <div className="section-label">How We Work</div>
              <h2 className="section-title" style={{fontSize:'1.8rem'}}>
                Simple, <em>personal</em> service
              </h2>
              <div className="gold-divider"><div className="gold-divider-icon"/></div>
              <div style={{display:'flex',flexDirection:'column',gap:20,marginTop:8}}>
                {[
                  {step:'01',text:"Click 'Order Now' on any product"},
                  {step:'02',text:'Fill in your details on the order form'},
                  {step:'03',text:'We contact you via Viber or Messenger'},
                  {step:'04',text:'Arrange payment (GCash, PayMaya, Bank Transfer)'},
                  {step:'05',text:'We ship your order directly to you'},
                ].map(s => (
                  <div key={s.step} style={{display:'flex',gap:16,alignItems:'flex-start'}}>
                    <div style={{
                      fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1.1rem',
                      color:'var(--gold)',opacity:0.6,flexShrink:0,width:28
                    }}>{s.step}</div>
                    <div style={{color:'var(--charcoal-light)',lineHeight:1.7}}>{s.text}</div>
                  </div>
                ))}
              </div>

              <div style={{marginTop:36,padding:'24px 28px',borderLeft:'2px solid var(--gold)',background:'rgba(201,168,76,0.05)'}}>
                <div className="section-label" style={{marginBottom:6}}>Payment Methods</div>
                <p style={{color:'var(--text-muted)',fontSize:'0.9rem',lineHeight:1.8}}>
                  GCash &bull; PayMaya &bull; Bank Transfer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
