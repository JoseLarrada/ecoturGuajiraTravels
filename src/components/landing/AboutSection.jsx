import { Star } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                ¿Quiénes somos?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                En <span className="font-semibold text-green-600">Ecotur Guajira</span>, somos apasionados por el ecoturismo y la conexión cultural con la naturaleza. Nos especializamos en crear experiencias auténticas que te permiten descubrir los tesoros naturales de La Guajira, el Cesar y Magdalena.
              </p>
              <p className="text-xl text-gray-700 font-medium italic mb-8">
                "Transformamos tus vacaciones en una experiencia inolvidable explorando los paisajes más espectaculares del Caribe colombiano."
              </p>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Viajeros felices</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">15+</div>
                  <div className="text-sm text-gray-600">Destinos únicos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-gray-600">Años de experiencia</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Equipo Ecotur Guajira en tour"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold">4.9/5</span>
                </div>
                <div className="text-sm">Calificación promedio</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;