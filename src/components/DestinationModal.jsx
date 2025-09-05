import { X, MapPin, Camera, Clock, Star} from 'lucide-react';

const DestinationModal = ({ isOpen, onClose, destination }) => {
  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img 
            src={destination.mainImage} 
            alt={destination.name}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">{destination.name}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
              <destination.icon className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">{destination.type}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800">{destination.experiences} experiencias</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-orange-800">Visita recomendada: {destination.bestTime}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Sobre {destination.name}</h3>
            <p className="text-gray-600 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* History */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Historia y Cultura</h3>
            <p className="text-gray-600 leading-relaxed">
              {destination.history}
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">¿Qué hace especial a {destination.name}?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {destination.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Galería
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {destination.gallery.map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img 
                    src={image.url} 
                    alt={`${destination.name} - ${image.caption}`}
                    className="w-full h-32 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all flex items-end">
                    <p className="text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Actividades recomendadas</h3>
            <div className="flex flex-wrap gap-2">
              {destination.activities.map((activity, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-center pt-4">
            <button 
              onClick={onClose}
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              ¡Quiero visitar este lugar!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;