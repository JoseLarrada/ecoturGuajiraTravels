import { Clock,Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import pilon from '../../Images/Cabo/pilon-de-azucar.jpg';
import montes from '../../Images/MontesDeOca/Cascadas.jpg';
import punta from '../../Images/PuntaGallina/principal.jpg'; 

const FeaturedTours = () => {
  const tours = [
    {
      id: 1,
      image: pilon,
      title: "Cabo de la Vela Mágico",
      duration: "4 días / 3 noches",
      price: "280,000",
      rating: 4.8,
      badge: "Más Popular",
      badgeColor: "bg-red-500",
      description: "Explora las playas vírgenes y la cultura Wayuu en este paraíso desértico."
    },
    {
      id: 2,
      image: montes,
      title: "Montes de Oca",
      duration: "1 día",
      price: "250.000",
      rating: 4.9,
      badge: "Recomendado",
      badgeColor: "bg-green-500",
      description: "Descubre la montaña costera más alta del mundo y sus ecosistemas únicos."
    },
    {
      id: 3,
      image: punta,
      title: "Punta Gallinas Extremo",
      duration: "3 días / 2 noches",
      price: "800,000",
      rating: 4.7,
      badge: "Próxima Salida",
      badgeColor: "bg-blue-500",
      description: "Llega al punto más septentrional de Sudamérica en una aventura única."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tours Destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestros tours más populares y vive experiencias inolvidables en los destinos más espectaculares del Caribe colombiano.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-4 left-4 ${tour.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {tour.badge}
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{tour.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{tour.title}</h3>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{tour.duration}</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${tour.price}
                  </div>
                </div>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>Ver Tour</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/destinos"
            className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Ver Todos los Tours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;