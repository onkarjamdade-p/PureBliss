import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './screens/Home'
import About from './screens/About'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SkinCare from './screens/SkinCare'
import HairCare from './screens/HairCare'
import EyeCare from './screens/EyeCare'
import SemiPermanentMakeup from './screens/SemiPermanentMakeup'


import ScrollToTop from './utils/ScrollToTop'

import Contact from './screens/Contact'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Appointment from './screens/Appointment';

const App = () => {

  return (
    <div className=''>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/skincare' element={<SkinCare />} />
          <Route path="/haircare" element={<HairCare />} />
          <Route path="/eyecare" element={<EyeCare />} />
          <Route path="/makeup" element={<SemiPermanentMakeup />} />
          <Route path="/Appointment" element={<Appointment />} />






          <Route path='/contact' element={<Contact />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App