import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause} from 'lucide-react';

const CarouselControls = ({ onPrev, onNext, isPlaying, onTogglePlay }) => (
  <>
    <button
      onClick={onPrev}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
      aria-label="Slide anterior"
    >
      <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
    </button>
    
    <button
      onClick={onNext}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
      aria-label="Siguiente slide"
    >
      <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
    </button>
    
    <button
      onClick={onTogglePlay}
      className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-300"
      aria-label={isPlaying ? "Pausar" : "Reproducir"}
    >
      {isPlaying ? (
        <Pause className="w-5 h-5 text-white" />
      ) : (
        <Play className="w-5 h-5 text-white" />
      )}
    </button>
  </>
);

export default CarouselControls