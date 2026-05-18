// App.jsx is the root of the entire application.
// It imports every section component and renders them
// top to bottom — exactly the order they appear on the page.

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'
import Footer from './components/Footer'

function App() {
  return (
    // The outer div is the page wrapper.
    // bg-slate-50 gives the whole page a very light background.
    <div className="bg-slate-50">
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
    </div>
  )
}

export default App