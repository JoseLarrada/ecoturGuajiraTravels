import React, { useState, useEffect } from 'react';

const CarouselIndicators = ({ total, current, onSelect }) => (
  <div className="absolute bottom-6 right-8 flex space-x-2">
    {Array.from({ length: total }, (_, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          current === index 
            ? 'bg-[#ADD90D] scale-110' 
            : 'bg-white/50 hover:bg-white/70'
        }`}
        aria-label={`Ir al slide ${index + 1}`}
      />
    ))}
  </div>
);

export default CarouselIndicators;