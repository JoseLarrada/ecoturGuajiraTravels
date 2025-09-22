import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import DashboardView from '../components/dashboard/DashboardView';
import CrudView from '../components/crud/CrudView';
import { menuItems } from '../utils/menuConfig.jsx'; // Nota la extensión .jsx

const AdminPage = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderMainContent = () => {
    if (selectedMenuItem === 'dashboard') {
      return <DashboardView />;
    }

    const menuItem = menuItems.find(item => item.id === selectedMenuItem);
    if (menuItem) {
      return (
        <CrudView
          title={menuItem.title}
          service={menuItem.service}
          FormComponent={menuItem.FormComponent}
          columns={menuItem.columns}
          searchFields={menuItem.searchFields}
        />
      );
    }

    return <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-gray-900">Página no encontrada</h2>
      <p className="text-gray-600">La sección solicitada no existe.</p>
    </div>;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        selectedItem={selectedMenuItem}
        onSelectItem={setSelectedMenuItem}
        menuItems={menuItems}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;