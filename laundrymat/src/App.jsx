import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import Services      from './components/Services'
import HowItWorks    from './components/HowItWorks'
import Pricing       from './components/Pricing'
import Testimonials  from './components/Testimonials'
import Booking       from './components/Booking'
import Footer        from './components/Footer'
import ThemeSwitcher from './components/ThemeSwitcher'
import { useTheme }  from '../context/useTheme'

function App() {
  const { theme } = useTheme()

  return (
    <div style={{ background: theme.bg, minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      {/* Floating theme switcher — always on top */}
      <ThemeSwitcher />
    </div>
  )
}

export default App