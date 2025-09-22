import React from 'react';
import { 
  LayoutDashboard, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, selectedItem, onSelectItem, menuItems }) => {
  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          {isOpen ? (
            <h1 className="text-xl font-bold text-gray-800">EcoTur Admin</h1>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <button
                onClick={() => onSelectItem('dashboard')}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                  selectedItem === 'dashboard' 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                <LayoutDashboard size={20} className="flex-shrink-0" />
                {isOpen && <span className="ml-3">Dashboard</span>}
              </button>
            </li>

            {/* Menu Items */}
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSelectItem(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                    selectedItem === item.id 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-700'
                  }`}
                  title={!isOpen ? item.title : ''}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {isOpen && <span className="ml-3">{item.title}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;