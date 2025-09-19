import {Compass} from 'lucide-react';
import logo from '../../Images/image.png';
const Logo = ({ className = "" }) => (
  <div className={`flex items-center space-x-3 ${className}`}>
    <img src={logo} alt="" className="w-12 h-12 object-contain" />
    <div>
      <h1 className="text-2xl font-bold text-[#6A8C20] leading-tight">Ecotur Guajira</h1>
      <p className="text-sm text-[#03A6A6] font-medium -mt-1">Haz de tus vacaciones un sueño</p>
    </div>
  </div>
);
export default Logo;