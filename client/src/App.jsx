import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import JewelryPage from './pages/JewelryPage'
import AccessoriesPage from './pages/AccessoriesPage'
import CustomOrdersPage from './pages/CustomOrdersPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )

    // Observe existing elements
    const observeAll = () => {
      document.querySelectorAll('.animate-in:not(.visible)').forEach(el => observer.observe(el))
    }
    observeAll()

    // Observe future dynamically added elements (like products)
    const mutationObserver = new MutationObserver(observeAll)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <BrowserRouter>
      <ParticleBackground />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jewelry" element={<JewelryPage />} />
          <Route path="/jewelry/:sub" element={<JewelryPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/accessories/:sub" element={<AccessoriesPage />} />
          <Route path="/custom-orders" element={<CustomOrdersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
