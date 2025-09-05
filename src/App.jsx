import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EcoturNavBar from './pages/EcoturNavBar'
import WhatsAppFloatButton from './components/WhatsAppFloatButton'
import DestinosPage from './pages/DestinosPage'
import EcoturLanding from './pages/EcoturLanding'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Experience from './pages/ExperiencesSection'

function App() {
  return (
    <Router>
      <EcoturNavBar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<EcoturLanding />} />
          <Route path="/destinos" element={<DestinosPage />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/experiencias" element={<Experience />} />
        </Routes>
      </div>
      <WhatsAppFloatButton 
        phoneNumber="573005182908"
        message="¡Hola! Me interesa conocer más sobre los tours de Ecotur Guajira. ¿Podrían darme más información?"
        position="bottom-right"
      />
    </Router>
    
  )
}

export default App
