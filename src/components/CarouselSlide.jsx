import React, { useState, useEffect } from 'react';
import {MapPin} from 'lucide-react';

const CarouselSlide = ({ image, title, description, location, isActive }) => (
  <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}>
    <div className="relative h-full w-full">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent">
        <div className="absolute bottom-0 left-0 p-8 text-white max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{location}</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">{title}</h2>
          <p className="text-lg opacity-90 mb-6">{description}</p>
          <button className="bg-[#ADD90D] hover:bg-[#ADD90D] px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
            Explorar Destino
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CarouselSlide;