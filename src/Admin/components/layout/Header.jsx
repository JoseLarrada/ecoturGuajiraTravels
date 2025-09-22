import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

const Header = ({ onToggleSidebar, isSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          <h2 className="ml-4 text-lg font-semibold text-gray-800">
            Panel de Administración
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">Administrador</p>
              <p className="text-xs text-gray-500">admin@ecotur.com</p>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;