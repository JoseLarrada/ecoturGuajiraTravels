import { X,Search,} from 'lucide-react';

const SearchBar = ({ isVisible, onClose }) => (
  <div className={`absolute top-full left-0 w-full bg-white border-t-2 border-[#ADD90D] shadow-lg transition-all duration-300 ${
    isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
  }`}>
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6A8C20] w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar destinos en La Guajira, tours ecológicos, experiencias..."
          className="w-full pl-12 pr-12 py-4 border-2 border-[#ADD90D]/30 rounded-xl focus:ring-2 focus:ring-[#6A8C20] focus:border-[#6A8C20] outline-none text-gray-700 placeholder-gray-500"
        />
        <button
          onClick={onClose}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#6A8C20] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
);
export default SearchBar;