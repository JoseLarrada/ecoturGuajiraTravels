import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react';
const TopBar = () => (
  <div className="bg-[#6A8C20] text-white py-2.5 px-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-[#ADD90D]" />
          <span>+57 300 5182908</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-[#ADD90D]" />
          <span>ecoturguajiratravels@gmail.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-[#ADD90D]" />
          <span>Maicao, La Guajira</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <a href="https://www.facebook.com/profile.php?id=100092996035616" className="hover:text-[#ADD90D] transition-colors p-1">
          <Facebook className="w-4 h-4" />
        </a>
        <a href="https://www.instagram.com/ecoturguajiratravels?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-[#ADD90D] transition-colors p-1">
          <Instagram className="w-4 h-4" />
        </a>
        <a href="#" className="hover:text-[#ADD90D] transition-colors p-1">
          <Twitter className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);
export default TopBar;