import { Link } from 'react-router-dom'

const STEPS = [
  { num: '01', text: 'Send us your idea or a photo of what you want' },
  { num: '02', text: "We'll discuss materials, design, and price" },
  { num: '03', text: 'We create a wax model for your approval' },
  { num: '04', text: 'We craft your piece and deliver it to you' },
]

const SERVICES = [
  { icon: '💍', title: 'Ring Restoration', desc: 'A ring restored to its former glory' },
  { icon: '⚜️', title: 'Masonic Rings', desc: "Custom Masonic ring with your lodge's symbol" },
  { icon: '🎓', title: 'College Rings', desc: 'A college ring with your school crest' },
  { icon: '💒', title: 'Wedding Rings', desc: 'Customize wedding rings for your special day' },
]

export default function CustomOrdersPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="section-label animate-in">Bespoke</div>
          <h1 className="section-title animate-in" style={{marginBottom:0}}>
            Custom Jewelry,<br /><em>Made for You</em>
          </h1>
          <div className="gold-divider animate-in" style={{maxWidth:300,margin:'16px auto'}}>
            <div className="gold-divider-icon" />
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="custom-page">
            <p className="section-body animate-in" style={{maxWidth:'100%',fontSize:'1.15rem'}}>
              At Golden Lady, we don't just sell jewelry — we create it. Whether you need
              something restored, designed from scratch, or personalized to perfection,
              we work with you from concept to completion. Every piece is handcrafted with care.
            </p>

            {/* What we offer */}
            <div style={{marginTop:56}}>
              <div className="section-label animate-in">What We Create</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:24,marginTop:24}}>
                {SERVICES.map(s => (
                  <div key={s.title} className="step-card animate-in">
                    <div style={{fontSize:'2rem',marginBottom:12}}>{s.icon}</div>
                    <div style={{fontFamily:'var(--font-display)',fontSize:'1rem',fontWeight:700,color:'var(--charcoal)',marginBottom:8}}>
                      {s.title}
                    </div>
                    <div className="step-text">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div style={{marginTop:64}}>
              <div className="section-label animate-in">How It Works</div>
              <h2 className="section-title animate-in">
                Your journey to a<br /><em>perfect piece</em>
              </h2>
              <div className="how-it-works">
                {STEPS.map(s => (
                  <div key={s.num} className="step-card animate-in">
                    <div className="step-num">{s.num}</div>
                    <div className="step-text">{s.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="animate-in" style={{
              marginTop:64,textAlign:'center',padding:'56px 40px',
              background:'var(--charcoal)',position:'relative',overflow:'hidden'
            }}>
              <div style={{
                position:'absolute',inset:0,
                background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.12), transparent)'
              }} />
              <div style={{position:'relative',zIndex:1}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'1.5rem',color:'var(--cream)',marginBottom:12}}>
                  Ready to create something special?
                </div>
                <p style={{color:'rgba(250,246,239,0.6)',marginBottom:28,fontStyle:'italic'}}>
                  Send us a message and let's begin.
                </p>
                <Link to="/contact" className="btn-primary">
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
