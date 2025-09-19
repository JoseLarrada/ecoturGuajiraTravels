import React, { useState, useEffect, useRef } from 'react';
import { Sun, Compass, Heart, Mountain } from 'lucide-react';
import senderismo from '../Images/MontesDeOca/senderismo-.webp';
import sendero from '../Images/MontesDeOca/Sendero.jpg';
import rios from '../Images/MontesDeOca/RiosCristalinos.webp';
import bahia from '../Images/PuntaGallina/Bahia_hondita.jpeg';
import dunas from '../Images/PuntaGallina/dunas.webp';
import punta from '../Images/PuntaGallina/principal.jpg';
import flamencos from '../Images/camarones/flamencos.jpg';
import manglares from '../Images/camarones/Manglares.png';
import pesca from '../Images/camarones/pescaArtesanal.png';


const ExperiencesSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const experiences = [
    {
      id: 1,
      title: "Montes de Oca",
      phrase: "Reserva natural, la mas hermosa de Colombia",
      images: [
        senderismo,
        sendero,
        rios
      ],
      color: "from-emerald-400 to-green-600",
      icon: Sun,
    },
    {
      id: 2,
      title: "Punta Gallinas",
      phrase: "El último suspiro de Suramérica",
      images: [
        bahia,
        dunas,
        punta
      ],
      color: "from-green-400 to-emerald-700",
      icon: Compass,
    },
    {
      id: 3,
      title: "Flamencos Rosados",
      phrase: "Ballet natural en aguas cristalinas",
      images: [
        flamencos,
        manglares,
        pesca
      ],
      color: "from-green-500 to-emerald-600",
      icon: Mountain,
    }
  ];

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.floor(scrollPosition / windowHeight);
      setActiveSection(Math.min(sectionIndex, experiences.length));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inicializar índices de imágenes
  useEffect(() => {
    const initialIndices = {};
    experiences.forEach(exp => {
      initialIndices[exp.id] = 0;
    });
    setCurrentImageIndex(initialIndices);
  }, []);

  // Auto-rotate images for each experience
  useEffect(() => {
    const intervals = {};
    
    experiences.forEach((experience, index) => {
      intervals[experience.id] = setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [experience.id]: ((prev[experience.id] || 0) + 1) % experience.images.length
        }));
      }, 4000 + (index * 1000)); // Tiempo diferente para cada experiencia
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [experiences]);

  const FloatingElement = ({ children, delay = 0 }) => {
    // Ocultar elementos flotantes en móvil para mejor rendimiento
    if (isMobile) return null;
    
    return (
      <div 
        className="absolute animate-pulse hidden md:block"
        style={{ 
          animationDelay: `${delay}s`,
          animationDuration: `4s`,
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center">
        {/* Background with animated curves - Responsive */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-full md:w-3/5 h-full">
            <div 
              className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 relative transform transition-all duration-1000"
              style={{
                clipPath: isMobile ? 'polygon(0% 0%, 100% 0%, 100% 70%, 0% 100%)' : 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
                transform: isMobile ? 'none' : `translateX(${scrollY * 0.1}px)`,
              }}
            >
              <div className="absolute inset-0 opacity-20">
                <FloatingElement delay={0}>
                  <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
                </FloatingElement>
                <FloatingElement delay={1}>
                  <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-lg rotate-45"></div>
                </FloatingElement>
                <FloatingElement delay={2}>
                  <div className="absolute bottom-32 left-20 w-16 h-16 bg-white rounded-full"></div>
                </FloatingElement>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-center lg:justify-start">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-2 w-fit">
                    <span>🌿</span>
                    <span>Ecotur Guajira</span>
                  </span>
                </div>

                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight">
                    NUESTRAS
                    <br />
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                      EXPERIENCIAS
                    </span>
                  </h1>
                </div>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Momentos únicos que quedan grabados para siempre en tu corazón
                </p>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative order-first lg:order-last">
              <div 
                className="transform transition-all duration-700"
                style={{ 
                  transform: isMobile ? 'none' : `translateY(${-scrollY * 0.1}px) scale(${1 - scrollY * 0.0002})` 
                }}
              >
                <img 
                  src="src/Images/image.png"
                  alt="La Guajira"
                  className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl sm:rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Sections */}
      {experiences.map((experience, index) => {
        const currentImg = currentImageIndex[experience.id] || 0;
        return (
        <div 
          key={experience.id}
          className="min-h-screen relative overflow-hidden"
        >
          {/* Dynamic image carousel with parallax - SIN OVERLAY OPACO */}
          <div className="absolute inset-0 z-0">
            {experience.images.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  imgIndex === currentImg ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: isMobile ? 'scroll' : 'fixed',
                  transform: isMobile ? 'none' : `translateY(${(scrollY - (index + 1) * window.innerHeight) * 0.3}px)`,
                }}
              />
            ))}
          </div>

          {/* Overlay gradient MÁS SUTIL - Solo para legibilidad del texto */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30 z-10`}></div>

          {/* Content */}
          <div className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div 
                className="transform transition-all duration-1000"
                style={{
                  opacity: activeSection >= index + 1 ? 1 : 0.3,
                  transform: `translateY(${activeSection >= index + 1 ? 0 : (isMobile ? 40 : 80)}px)`,
                }}
              >
                {/* Icon */}
                <div className="mb-6 sm:mb-8 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    {React.createElement(experience.icon, { className: "w-8 h-8 sm:w-10 sm:h-10 text-white" })}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl px-2">
                  {experience.title}
                </h2>

                {/* Phrase */}
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-light italic max-w-4xl mx-auto leading-relaxed drop-shadow-xl px-4">
                  "{experience.phrase}"
                </p>

                {/* Decorative line */}
                <div className="mt-8 sm:mt-12 flex justify-center">
                  <div className="w-16 sm:w-24 h-0.5 bg-white/70"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Number indicator - Responsive */}
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-30">
            <div className="text-4xl sm:text-6xl md:text-8xl font-bold text-white/40 drop-shadow-lg">
              0{index + 1}
            </div>
          </div>

          {/* Image carousel indicators */}
          <div className="absolute bottom-16 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex space-x-1 sm:space-x-2">
              {experience.images.map((_, imgIdx) => (
                <div 
                  key={imgIdx}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-500 ${
                    imgIdx === currentImg ? 'bg-white w-4 sm:w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-30">
            <div className="flex space-x-1 sm:space-x-2">
              {experiences.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-500 ${
                    activeSection >= idx + 1 ? 'bg-white w-4 sm:w-8' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        )
      })}

      {/* Final Section - Pure visual impact */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div 
              className="transform transition-all duration-1000"
              style={{
                opacity: activeSection >= experiences.length ? 1 : 0.3,
                transform: `translateY(${activeSection >= experiences.length ? 0 : (isMobile ? 40 : 80)}px)`,
              }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight px-2">
                Ecotur Guajira Travels
                <br />
                <span className="text-green-400">Te Espera</span>
              </h2>
              
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 font-light italic leading-relaxed px-4">
                "Haz de tus vacaciones un sueño"
              </p>

              {/* Decorative elements */}
              <div className="mt-12 sm:mt-16 flex justify-center space-x-4 sm:space-x-8">
                <div className="w-0.5 sm:w-1 h-12 sm:h-16 bg-green-400"></div>
                <div className="w-0.5 sm:w-1 h-8 sm:h-12 bg-white/50"></div>
                <div className="w-0.5 sm:w-1 h-6 sm:h-8 bg-green-400/60"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorative elements - Solo desktop */}
        <div className="absolute inset-0 z-15 opacity-20">
          <FloatingElement delay={0}>
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          </FloatingElement>
          <FloatingElement delay={1}>
            <div className="absolute bottom-40 right-20 w-24 h-24 bg-green-400 rounded-lg rotate-45"></div>
          </FloatingElement>
          <FloatingElement delay={2}>
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-white rounded-full"></div>
          </FloatingElement>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesSection;