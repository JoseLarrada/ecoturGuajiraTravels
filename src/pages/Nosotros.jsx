import React from 'react';
import { MapPin, Phone, Building, Award, Users, Camera, ArrowRight } from 'lucide-react';

const Nosotros = () => {
  // Datos de la empresa
  const empresaInfo = {
    razonSocial: "Agencia De Viajes Ecotur Guajira Travels Sas",
    telefono: "3009743501",
    ciudad: "MAICAO",
    departamento: "LA GUAJIRA",
    direccion: "CALLE 14 12 65 BRR CENTRO",
    nit: "9017316344",
    actividad: "Actividades de operadores turísticos",
    formaJuridica: "SOCIEDAD POR ACCIONES SIMPLIFICADA"
  };

  const exposiciones = [
    "ExpoGuajira 2023",
    "Expositorio Uniguajira",
    "Alianza de turismo en el Santander",
    "Expo Guajira Frontereas 2024",
    "Rueda de negocios expoguajira"
  ];

  // Timeline de la empresa
  const timeline = [
    { year: "2023", title: "Fundación", description: "Inicio de operaciones turísticas" },
    { year: "2023", title: "Expansión", description: "Nuevas rutas y experiencias" },
    { year: "2023", title: "Reconocimiento", description: "Participación en ExpoGuajira" },
    { year: "2024", title: "Crecimiento", description: "Alianzas estratégicas" }
  ];

  // Fotos placeholder para el mosaico (reemplaza con tus URLs reales)
  const experienciasFotos = [
    { id: 1, url: "src/Images/Cabo/deiserto.jpg", alt: "Desierto de La Guajira", descripcion: "Aventuras en el desierto" },
    { id: 2, url: "src/Images/MontesDeOca/senderismo-.webp", alt: "Bosque tropical", descripcion: "Ecoturismo en la naturaleza" },
    { id: 3, url: "src/Images/Palomino/RioPlaya.webp", alt: "Playa caribeña", descripcion: "Costas del Caribe" },
    { id: 4, url: "src/Images/Cabo/Faro-de-Cabo-de-la-Vela-viajar-a-colombia-aventureros-360-10-.jpg", alt: "Atardecer", descripcion: "Experiencias únicas" },
    { id: 5, url: "src/Images/Palomino/sierraFondo.jpg", alt: "Montañas", descripcion: "Sierra Nevada" },
    { id: 6, url: "src/Images/Palomino/Indigenas.jpg", alt: "Cultura local", descripcion: "Cultura Wayuu" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Estilo Clearcover */}
      <div className="relative bg-[#6A8C20] overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Esta es <span className="italic text-green-200">nuestra</span> historia Ecotur
              </h1>
              <p className="text-xl lg:text-2xl text-green-100 leading-relaxed mb-8">
                Desde nuestros primeros pasos hasta convertirnos en líderes del ecoturismo en La Guajira. 
                Aquí está lo que eso significa, desde el primer día hasta hoy.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Equipo Ecotur" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section - Estilo moderno */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Nuestro camino</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada paso nos ha llevado a donde estamos hoy
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full text-xl font-bold mb-4">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Información de la Empresa - Estilo Lyft */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm font-semibold text-green-600 mb-4 tracking-wide uppercase">
                Información Corporativa
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Creemos en hacer del turismo una experiencia transformadora
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Como operadores turísticos especializados, conectamos a las personas con la 
                magia natural y cultural de La Guajira, creando recuerdos que duran para siempre.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-2xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600">Viajeros satisfechos</div>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-2xl font-bold text-green-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Destinos únicos</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Building className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Razón Social</h4>
                      <p className="text-gray-600 text-sm">{empresaInfo.razonSocial}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Ubicación</h4>
                      <p className="text-gray-600 text-sm">
                        {empresaInfo.direccion}<br />
                        {empresaInfo.ciudad}, {empresaInfo.departamento}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Contacto</h4>
                      <p className="text-gray-600 text-sm">{empresaInfo.telefono}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      NIT: {empresaInfo.nit} • {empresaInfo.formaJuridica}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exposiciones - Grid moderno */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Nuestras alianzas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Participamos activamente en eventos que fortalecen el turismo regional
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exposiciones.map((expo, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {expo}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Evento 2023-2024</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mosaico de Experiencias - Estilo Pinterest */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Nuestras experiencias
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada imagen cuenta una historia de aventura y descubrimiento
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experienciasFotos.map((foto, index) => (
              <div key={foto.id} className={`group cursor-pointer ${index % 3 === 1 ? 'lg:mt-8' : ''}`}>
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                  <img 
                    src={foto.url} 
                    alt={foto.alt}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-semibold text-xl mb-2">{foto.descripcion}</h3>
                      <p className="text-green-200 text-sm">Explora más →</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final - Estilo minimalista */}
      <div className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Únete a cientos de viajeros que han descubierto la magia de La Guajira con nosotros
          </p>
          <button className="inline-flex items-center bg-white text-green-600 font-semibold py-4 px-8 rounded-full hover:bg-green-50 transition-all duration-200 transform hover:scale-105 shadow-xl">
            Reservar Tour
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;