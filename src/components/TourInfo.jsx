import React, { useState, useEffect } from 'react';
import { Calendar, Users } from 'lucide-react';

const TourInfo = ({ duration, capacity, price }) => (
  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        <span>{duration}</span>
      </div>
      <div className="flex items-center gap-1">
        <Users className="w-4 h-4" />
        <span>{capacity}</span>
      </div>
      <div className="font-bold text-[#ADD90D]">
        ${price}
      </div>
    </div>
  </div>
);
export default TourInfo;