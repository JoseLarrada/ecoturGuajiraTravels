import { Star, Shield, Leaf, Headphones, Award} from 'lucide-react';
const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: Award,
      title: "Guías Expertos",
      description: "Guías locales certificados con amplio conocimiento de la región y su cultura",
      color: "#F29441"
    },
    {
      icon: Shield,
      title: "Seguridad y Cumplimiento",
      description: "Protocolos de seguridad rigurosos y cumplimiento de todas las normativas turísticas",
      color: "#03A6A6"
    },
    {
      icon: Leaf,
      title: "Turismo Sostenible",
      description: "Comprometidos con la conservación del medio ambiente y el desarrollo de las comunidades locales",
      color: "#6A8C20"
    },
    {
      icon: Headphones,
      title: "Soporte 24/7",
      description: "Atención personalizada antes, durante y después de tu viaje para garantizar tu tranquilidad",
      color: "#F23545"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Somos más que una agencia de viajes, somos tus compañeros de aventura comprometidos con ofrecerte la mejor experiencia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow" style={{backgroundColor: benefit.color + '20'}}>
                  <benefit.icon className="w-10 h-10" style={{color: benefit.color}} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full" style={{backgroundColor: '#ADD90D20'}}>
            <Star className="w-5 h-5 fill-current" style={{color: '#ADD90D'}} />
            <span className="font-semibold" style={{color: '#6A8C20'}}>Más de 500 viajeros satisfechos nos respaldan</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUsSection;