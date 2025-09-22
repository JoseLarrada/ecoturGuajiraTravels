import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import EcoturLanding from '../pages/EcoturLanding';
import DestinosPage from '../pages/DestinosPage';
import Nosotros from '../pages/Nosotros';
import Contacto from '../pages/Contacto';
import Experience from '../pages/ExperiencesSection';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<PublicLayout />}>
        <Route index element={<EcoturLanding />} />
        <Route path="destinos" element={<DestinosPage />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="experiencias" element={<Experience />} />
      </Route>
    </Routes>
  );
}

export default PublicRoutes;