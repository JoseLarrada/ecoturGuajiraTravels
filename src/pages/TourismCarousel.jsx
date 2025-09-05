import React, { useState, useEffect } from 'react';
import CarouselControls from '../components/CarouselControls'
import CarouselIndicators from '../components/CarouselIndicators'
import CarouselSlide from '../components/CarouselSlide'
import TourInfo from '../components/TourInfo'
import montesDeOca from '../Images/MontesDeOca/RiosCristalinos.webp'
import plaza from '../Images/RutaVallenata/plazaAlfonzoLopez.jpg'
import RioPlaya from '../Images/Palomino/RioPlaya.webp'
import cabo from '../Images/Cabo/Cabo_de_la_Vela,_Colombia.jpg'


const TourismCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Datos de ejemplo para los slides
  const slides = [
    {
      image: montesDeOca,
      title: "Montes de Oca",
      description: "Naturaleza y aventura en una reserva natural. Explora senderos, observa fauna y disfruta de paisajes impresionantes.",
      location: "Montes de Oca, La Guajira",
      duration: "1 día",
      capacity: "12 personas",
      price: "250.000"
    },
    {
      image: cabo,
      title: "Cabo de la Vela",
      description: "Aventúrate en la magia del Cabo de la Vela. Un lugar donde el desierto se encuentra con el mar.",
      location: "La Guajira",
      duration: "3 días",
      capacity: "8 personas",
      price: "280.000"
    },
    {
      image: plaza,
      title: "Valledupar Cultural",
      description: "Sumérgete en la cuna del vallenato. Festivales, música tradicional y la hospitalidad costeña en su máxima expresión.",
      location: "Valledupar, Cesar",
      duration: "2 días",
      capacity: "15 personas",
      price: "390.000"
    },
    {
      image: RioPlaya,
      title: "Palomino Guajira",
      description: "Explora paisajes únicos donde el desierto se encuentra con el mar. Una experiencia mágica e inolvidable.",
      location: "La Guajira",
      duration: "1 día",
      capacity: "10 personas",
      price: "250.000"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <CarouselSlide
          key={index}
          image={slide.image}
          title={slide.title}
          description={slide.description}
          location={slide.location}
          isActive={currentSlide === index}
        />
      ))}

      {/* Tour Info */}
      <TourInfo
        duration={slides[currentSlide].duration}
        capacity={slides[currentSlide].capacity}
        price={slides[currentSlide].price}
      />

      {/* Controls */}
      <CarouselControls
        onPrev={goToPrevious}
        onNext={goToNext}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
      />

      {/* Indicators */}
      <CarouselIndicators
        total={slides.length}
        current={currentSlide}
        onSelect={goToSlide}
      />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-[#ADD90D] transition-all duration-300 ease-out"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default TourismCarousel;