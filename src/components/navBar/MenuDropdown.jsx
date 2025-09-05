import { ChevronDown,} from 'lucide-react';
const MenuDropdown = ({ title, items, isOpen, onToggle, isMobile = false }) => (
  <div className={`relative ${isMobile ? 'w-full' : ''}`}>
    <button
      onClick={onToggle}
      className={`flex items-center justify-between space-x-2 px-4 py-3 text-gray-700 hover:text-[#6A8C20] hover:bg-[#ADD90D]/10 transition-all duration-300 font-medium rounded-lg ${
        isMobile ? 'w-full text-left' : ''
      } ${isOpen ? 'text-[#6A8C20] bg-[#ADD90D]/10' : ''}`}
    >
      <span>{title}</span>
      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    
    {isOpen && (
      <div className={`${isMobile ? 'static w-full mt-2 mb-4' : 'absolute top-full left-0 mt-1 w-72'} bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50`}>
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center space-x-4 px-5 py-3 text-gray-600 hover:text-[#6A8C20] hover:bg-[#ADD90D]/10 transition-all duration-200 group"
          >
            <div className="bg-[#ADD90D]/20 p-2 rounded-lg group-hover:bg-[#ADD90D]/30 transition-colors">
              <item.icon className="w-5 h-5 text-[#6A8C20]" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 group-hover:text-[#6A8C20]">{item.title}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    )}
  </div>
);
export default MenuDropdown;