import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminPage from '../pages/AdminPage';
import LoginPage from '../pages/LoginPage';

function AdminRoutes() {
  // Función para verificar autenticación
  const isAuthenticated = () => {
    return localStorage.getItem('adminToken');
  };

  return (
    <Routes>
      {/* Ruta de login - sin protección */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rutas protegidas del admin */}
      <Route path="/*" element={
        isAuthenticated() ? (
          <AdminLayout />
        ) : (
          <Navigate to="/admin/login" replace />
        )
      }>
        {/* Todas las rutas del admin van al AdminPage que maneja la lógica interna */}
        <Route path="*" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;