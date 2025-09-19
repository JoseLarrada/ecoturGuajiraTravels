import { Star, Quote } from 'lucide-react';
import jose from '../../Images/testimonios/jose.jpg';
import loren from '../../Images/testimonios/loren.jpg';
const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jose Larrada",
      location: "Valledupar, Cesar",
      image: jose,
      rating: 5,
      text: "Una experiencia increíble en Cabo de la Vela. Los guías son muy profesionales y conocen cada rincón de La Guajira. Definitivamente volveré con mi familia."
    },
    {
      id: 2,
      name: "Maria Romani",
      location: "Medellín, Colombia",
      image: loren,
      rating: 5,
      text: "El tour a la Sierra Nevada superó todas mis expectativas. La organización fue perfecta y pude conectar realmente con la naturaleza y la cultura local."
    },
    {
      id: 3,
      name: "Ana López",
      location: "Cartagena, Colombia",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      text: "Ecotur Guajira hizo de mi viaje una aventura inolvidable. La seguridad, la calidad del servicio y el respeto por el medio ambiente son excepcionales."
    }
  ];

  return (
    <section className="py-16" style={{backgroundColor: '#f8f9fa'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Lo que dicen nuestros viajeros
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Las experiencias de nuestros clientes son nuestra mejor carta de presentación
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{color: '#ADD90D'}} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 opacity-20" style={{color: '#03A6A6'}} />
                <p className="text-gray-600 italic leading-relaxed pl-6">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TestimonialsSection;