import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X,
  Search,
  Users,
  Star,
  Camera,
  Mountain,
  Waves
} from 'lucide-react';
import Logo from '../components/navBar/Logo'
import MenuDropdown from '../components/navBar/MenuDropdown'
import SearchBar from '../components/navBar/SearchBar'
import TopBar from '../components/navBar/TopBar'
import ReservationModal from '../pages/ReservationModal'

const EcoturNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const destinosItems = [
    {
      title: "Cabo de la Vela",
      description: "Donde el desierto abraza el mar",
      icon: Waves,
      href: "#cabo-vela"
    },
    {
      title: "Punta Gallinas",
      description: "El punto más norte de Sudamérica",
      icon: Mountain,
      href: "#punta-gallinas"
    },
    {
      title: "Salinas de Manaure",
      description: "Paisajes de sal y flamencos rosados",
      icon: Camera,
      href: "#salinas"
    },
    {
      title: "Desierto de Taroa",
      description: "Dunas doradas y atardeceres únicos",
      icon: Star,
      href: "#taroa"
    },
    {
      title: "Ver Mas",
      description: "Explora nuestros maravillosos destinos",
      icon: Star,
      href: "destinos"
    }
  ];

  const experienciasItems = [
    {
      title: "Cultura Wayuu",
      description: "Conoce las tradiciones ancestrales",
      icon: Users,
      href: "#cultura-wayuu"
    },
    {
      title: "Turismo Sostenible",
      description: "Viaja respetando la naturaleza",
      icon: Star,
      href: "#sostenible"
    },
    {
      title: "Fotografía Paisajística",
      description: "Captura la magia de La Guajira",
      icon: Camera,
      href: "#fotografia"
    },
    {
      title: "Gastronomía Local",
      description: "Sabores auténticos wayuu",
      icon: Star,
      href: "#gastronomia"
    },
    {
      title: "Ver Mas",
      description: "Explora nuestros maravillosos destinos",
      icon: Star,
      href: "experiencias"
    }
  ];

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
    // Cerrar otros elementos si están abiertos
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setActiveDropdown(null);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="relative" onMouseLeave={closeAllDropdowns}>
        {/* Top Bar */}
        <TopBar />
        
        {/* Main Navbar */}
        <div className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-[#ADD90D]/20' : 'bg-white shadow-md'
        }`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Logo />

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-2">
                <a href="/" className="px-4 py-3 text-gray-700 hover:text-[#6A8C20] hover:bg-[#ADD90D]/10 font-medium transition-all duration-300 rounded-lg">
                  Inicio
                </a>
                
                <MenuDropdown
                  title="Destinos"
                  items={destinosItems}
                  isOpen={activeDropdown === 'destinos'}
                  onToggle={() => toggleDropdown('destinos')}
                />
                
                <a href="#" className="px-4 py-3 text-gray-700 hover:text-[#6A8C20] hover:bg-[#ADD90D]/10 font-medium transition-all duration-300 rounded-lg">
                  Tours
                </a>
                
                <MenuDropdown
                  title="Experiencias"
                  items={experienciasItems}
                  isOpen={activeDropdown === 'experiencias'}
                  onToggle={() => toggleDropdown('experiencias')}
                />
                
                <a href="nosotros" className="px-4 py-3 text-gray-700 hover:text-[#6A8C20] hover:bg-[#ADD90D]/10 font-medium transition-all duration-300 rounded-lg">
                  Nosotros
                </a>
                
                <a href="contacto" className="px-4 py-3 text-gray-700 hover:text-[#6A8C20] hover:bg-[#ADD90D]/10 font-medium transition-all duration-300 rounded-lg">
                  Contacto
                </a>
              </div>

              {/* Right Side - Search & CTA */}
              <div className="hidden lg:flex items-center space-x-4">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-3 text-[#6A8C20] hover:text-white hover:bg-[#6A8C20] transition-all duration-300 rounded-lg"
                >
                  <Search className="w-5 h-5" />
                </button>
                
                {/* BOTÓN PRINCIPAL QUE ABRE EL MODAL */}
                <button 
                  onClick={openModal}
                  className="bg-gradient-to-r from-[#6A8C20] to-[#ADD90D] hover:from-[#ADD90D] hover:to-[#6A8C20] text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Reservar Tour
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-[#6A8C20] hover:bg-[#ADD90D]/20 transition-all duration-300 rounded-lg"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar 
            isVisible={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)} 
          />

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="bg-white border-t-2 border-[#ADD90D] px-4 py-6 space-y-2">
              <a href="#" className="block py-3 px-4 text-gray-700 hover:text-[#6A8C20] hover:bg-[#ADD90D]/10 font-medium rounded-lg transition-all">
                Inicio
              </a>
              
              <MenuDropdown
                title="Destinos"
                items={destinosItems}
                isOpen={activeDropdown === 'destinos-mobile'}
                onToggle={() => toggleDropdown('destinos-mobile')}
                isMobile={true}
              />
              
              <a href="#" className="block py-3 px-4 text-gray-700 hover:text-[#6A8C20] hover:bg-[#ADD90D]/10 font-medium rounded-lg transition-all">
                Tours
              </a>
              
              <MenuDropdown
                title="Experiencias"
                items={experienciasItems}
                isOpen={activeDropdown === 'experiencias-mobile'}
                onToggle={() => toggleDropdown('experiencias-mobile')}
                isMobile={true}
              />
              
              <a href="nosotros" className="block py-3 px-4 text-gray-700 hover:text-[#6A8C20] hover:bg-[#ADD90D]/10 font-medium rounded-lg transition-all">
                Nosotros
              </a>
              <a href="contacto" className="block py-3 px-4 text-gray-700 hover:text-[#6A8C20] hover:bg-[#ADD90D]/10 font-medium rounded-lg transition-all">
                Contacto
              </a>
              
              <div className="pt-6 border-t border-[#ADD90D]/30 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6A8C20] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-[#ADD90D]/30 rounded-lg focus:ring-2 focus:ring-[#6A8C20] focus:border-[#6A8C20] outline-none"
                  />
                </div>
                {/* BOTÓN MÓVIL QUE ABRE EL MODAL */}
                <button 
                  onClick={openModal}
                  className="w-full bg-gradient-to-r from-[#6A8C20] to-[#ADD90D] text-white py-3 rounded-xl font-bold shadow-lg"
                >
                  Reservar Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal de Reserva */}
      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

export default EcoturNavbar;