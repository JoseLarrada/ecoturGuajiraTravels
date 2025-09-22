import React from 'react';
import { Outlet } from 'react-router-dom';
import EcoturNavBar from '../pages/EcoturNavBar';
import WhatsAppFloatButton from '../components/WhatsAppFloatButton';

function PublicLayout() {
  return (
    <>
      <EcoturNavBar />
      <div className="p-6">
        <Outlet />
      </div>
      <WhatsAppFloatButton 
        phoneNumber="573005182908"
        message="¡Hola! Me interesa conocer más sobre los tours de Ecotur Guajira. ¿Podrían darme más información?"
        position="bottom-right"
      />
    </>
  );
}

export default PublicLayout;