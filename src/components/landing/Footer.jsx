import { Phone, Mail, MapPin,Facebook, Instagram, Twitter} from 'lucide-react';
const Footer = () => {
  return (
    <footer className="text-white pt-16 pb-8" style={{backgroundColor: '#6A8C20'}}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-black p-2 rounded-full" style={{backgroundColor: '#ADD90D'}}>
                <span className="font-bold">E</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Ecotur Guajira</h3>
                <p className="text-sm opacity-80">Haz de tus vacaciones un sueño</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Descubre los tesoros naturales del Caribe colombiano con experiencias auténticas y sostenibles.
            </p>
            <div className="flex space-x-4 mt-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" />
              <Instagram className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" />
              <Twitter className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity" />
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Destinos</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Tours Populares</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Reservar Ahora</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Sobre Nosotros</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Testimonios</a></li>
            </ul>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Destinos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Cabo de la Vela</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Sierra Nevada</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Punta Gallinas</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Desierto de La Tatacoa</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Ver todos</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+57 315 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@ecoturguajira.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Maicao, La Guajira<br />Colombia</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="text-black px-4 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity" style={{backgroundColor: '#ADD90D'}}>
                Contactar Ahora
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white border-opacity-20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80 text-center md:text-left">
              © 2025 Ecotur Guajira. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Política de Privacidad</a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;