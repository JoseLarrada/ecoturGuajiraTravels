import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, User, Calendar, Users, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import emailjs from "emailjs-com";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    personas: '',
    destino: '',
    mensaje: ''
  });

  useEffect(() => {
    emailjs.init("icxJEq9FuCFOBIhHL"); // Tu public key
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_H3YQEKH,
      formData,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log("Correo enviado con éxito", result.text);
      alert("Correo enviado con éxito ✅");
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        fecha: '',
        personas: '',
        destino: '',
        mensaje: ''
      });
    })
    .catch((error) => {
      console.error("Error al enviar el correo", error.text);
      alert("Ocurrió un error al enviar el correo ❌");
    });
  };

  useEffect(() => {
    emailjs.init("icxJEq9FuCFOBIhHL"); // Tu public key
  }, []);


  const contactInfo = {
    telefono: "+57 300 5182908",
    email: "ecoturguajiratravels@gmail.com",
    direccion: "CALLE 14 12 65 BRR CENTRO",
    ciudad: "Maicao, La Guajira",
    horarios: {
      semana: "Lunes - Viernes: 8:00 AM - 6:00 PM",
      sabado: "Sábados: 9:00 AM - 4:00 PM",
      domingo: "Domingos: Cerrado"
    }
  };

  const destinos = [
    "Cabo de la Vela",
    "Punta Gallinas",
    "Desierto de La Tatacoa",
    "Sierra Nevada",
    "Palomino",
    "Manaure - Salinas",
    "Tour Personalizado"
  ];

  const metodosContacto = [
    {
      icon: Phone,
      titulo: "Llámanos",
      descripcion: "Habla directamente con nuestros asesores",
      contacto: contactInfo.telefono,
      accion: "Llamar ahora",
      color: "bg-green-500",
      tipo: "telefono"
    },
    {
      icon: Mail,
      titulo: "Email",
      descripcion: "Envíanos tus consultas por correo",
      contacto: contactInfo.email,
      accion: "Enviar email",
      color: "bg-blue-500",
      tipo: "email"
    },
    {
      icon: MessageCircle,
      titulo: "WhatsApp",
      descripcion: "Chatea con nosotros al instante",
      contacto: "573005182908",
      accion: "Abrir chat",
      color: "bg-green-600",
      tipo: "whatsapp"
    }
  ];

  const handleAccion = (metodo) => {
    if (metodo.tipo === "telefono") {
      window.location.href = `tel:${metodo.contacto}`;
    } else if (metodo.tipo === "email") {
      const subject = encodeURIComponent("Consulta Ecotur Guajira");
      const body = encodeURIComponent("Hola, me gustaría recibir más información sobre sus tours.");
      window.location.href = `mailto:${metodo.contacto}?subject=${subject}&body=${body}`;
    } else if (metodo.tipo === "whatsapp") {
      const mensaje = encodeURIComponent("¡Hola! Me interesa conocer más sobre los tours de Ecotur Guajira.");
      window.open(`https://wa.me/${metodo.contacto}?text=${mensaje}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Hablemos de tu próxima <span className="italic text-green-200">aventura</span>
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 leading-relaxed mb-8 max-w-4xl mx-auto">
              Estamos aquí para ayudarte a planificar la experiencia perfecta en La Guajira. 
              Contáctanos de la forma que prefieras.
            </p>
          </div>
        </div>
      </div>

      {/* Métodos de Contacto Rápido */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Contacto directo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige la forma más cómoda para ti
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {metodosContacto.map((metodo, index) => {
              const IconComponent = metodo.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:scale-[1.02]"
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 ${metodo.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{metodo.titulo}</h3>
                    <p className="text-gray-600 mb-4">{metodo.descripcion}</p>
                    <p className="font-semibold text-gray-900 mb-6">{metodo.contacto}</p>
                    <button
                      onClick={() => handleAccion(metodo)}
                      className="inline-flex items-center bg-green-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-green-700 transition-colors group-hover:translate-y-[-2px]"
                    >
                      {metodo.accion}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Formulario de Contacto y Información */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Formulario */}
            <div>
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Solicita tu cotización
                </h2>
                <p className="text-gray-600 mb-8">
                  Cuéntanos sobre tu viaje ideal y te ayudaremos a hacerlo realidad
                </p>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          placeholder="+57 300 123 4567"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fecha preferida
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          name="fecha"
                          value={formData.fecha}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Número de personas
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <select
                          name="personas"
                          value={formData.personas}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          required
                        >
                          <option value="">Selecciona</option>
                          <option value="1">1 persona</option>
                          <option value="2">2 personas</option>
                          <option value="3-5">3-5 personas</option>
                          <option value="6-10">6-10 personas</option>
                          <option value="11+">Más de 10</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Destino de interés
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <select
                          name="destino"
                          value={formData.destino}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          required
                        >
                          <option value="">Selecciona destino</option>
                          {destinos.map((destino, index) => (
                            <option key={index} value={destino}>{destino}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cuéntanos sobre tu viaje ideal
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Describe qué tipo de experiencia buscas, duración del viaje, intereses especiales, etc."
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-green-600 text-white font-semibold py-4 px-8 rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center justify-center transform hover:scale-[1.02]"
                  >
                    <Send className="mr-2 w-5 h-5" />
                    Enviar solicitud
                  </button>
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-8">
              {/* Información Principal */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Información de contacto
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Oficina principal</h4>
                      <p className="text-gray-600">
                        {contactInfo.direccion}<br />
                        {contactInfo.ciudad}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                      <p className="text-gray-600">{contactInfo.telefono}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">{contactInfo.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horarios */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 p-3 rounded-xl mr-4">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Horarios de atención
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Lunes - Viernes</span>
                    <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Sábados</span>
                    <span className="text-gray-600">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-900">Domingos</span>
                    <span className="text-red-500">Cerrado</span>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Síguenos
                </h3>
                
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/profile.php?id=100092996035616" className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/ecoturguajiratravels?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="bg-pink-600 text-white p-3 rounded-xl hover:bg-pink-700 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="bg-blue-400 text-white p-3 rounded-xl hover:bg-blue-500 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa - Placeholder */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Encuéntranos
            </h2>
            <p className="text-xl text-gray-600">
              Visítanos en nuestra oficina en el centro de Maicao
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-3xl h-96 flex items-center justify-center">
            <div className="text-center text-gray-600 w-full h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.3355701464575!2d-72.24293532597439!3d11.383155447711653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8bf38bbbf782dd%3A0x840580111126a2df!2sAgencia%20de%20viajes%20Ecotur%20Guajira%20Travels%20S.A.S!5e0!3m2!1ses!2sco!4v1756444912223!5m2!1ses!2sco"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;