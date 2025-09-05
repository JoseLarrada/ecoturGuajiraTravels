import React, { useState, useEffect } from 'react';
import emailjs from "emailjs-com";
const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    tourInterest: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    emailjs.init("icxJEq9FuCFOBIhHL"); // Tu public key
  }, []);
  

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
    })
    .catch((error) => {
      console.error("Error al enviar el correo", error.text);
      alert("Ocurrió un error al enviar el correo ❌");
    });
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del Modal */}
        <div className="relative text-white p-6 rounded-t-2xl" style={{backgroundColor: '#6A8C20'}}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-black p-3 rounded-full" style={{backgroundColor: '#ADD90D'}}>
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">¡Hablemos de tu próxima aventura!</h2>
              <p className="opacity-90">Estamos aquí para ayudarte a planificar el viaje perfecto</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Información de Contacto */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Información de Contacto</h3>
              
              {/* Teléfonos */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg" style={{backgroundColor: '#f8f9fa'}}>
                  <div className="p-3 rounded-full" style={{backgroundColor: '#ADD90D20'}}>
                    <Phone className="w-5 h-5" style={{color: '#03A6A6'}} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Teléfono Principal</h4>
                    <p className="text-gray-600">+57 315 123 4567</p>
                    <p className="text-sm text-gray-500">WhatsApp disponible</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg" style={{backgroundColor: '#f8f9fa'}}>
                  <div className="p-3 rounded-full" style={{backgroundColor: '#F2944120'}}>
                    <Phone className="w-5 h-5" style={{color: '#F29441'}} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Teléfono Alternativo</h4>
                    <p className="text-gray-600">+57 320 987 6543</p>
                    <p className="text-sm text-gray-500">Emergencias 24/7</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4 p-4 rounded-lg mb-6" style={{backgroundColor: '#f8f9fa'}}>
                <div className="p-3 rounded-full" style={{backgroundColor: '#03A6A620'}}>
                  <Mail className="w-5 h-5" style={{color: '#03A6A6'}} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Correo Electrónico</h4>
                  <p className="text-gray-600">info@ecoturguajira.com</p>
                  <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                </div>
              </div>

              {/* Ubicación */}
              <div className="flex items-start space-x-4 p-4 rounded-lg mb-6" style={{backgroundColor: '#f8f9fa'}}>
                <div className="p-3 rounded-full" style={{backgroundColor: '#6A8C2020'}}>
                  <MapPin className="w-5 h-5" style={{color: '#6A8C20'}} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Oficina Principal</h4>
                  <p className="text-gray-600">Calle 15 # 12-34, Centro</p>
                  <p className="text-gray-600">Maicao, La Guajira</p>
                  <p className="text-gray-600">Colombia</p>
                </div>
              </div>

              {/* Horarios */}
              <div className="flex items-start space-x-4 p-4 rounded-lg mb-6" style={{backgroundColor: '#f8f9fa'}}>
                <div className="p-3 rounded-full" style={{backgroundColor: '#F2354520'}}>
                  <Clock className="w-5 h-5" style={{color: '#F23545'}} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Horarios de Atención</h4>
                  <div className="text-gray-600 text-sm">
                    <p>Lun - Vie: 8:00 AM - 6:00 PM</p>
                    <p>Sábados: 9:00 AM - 4:00 PM</p>
                    <p>Domingos: Solo emergencias</p>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Síguenos en Redes Sociales</h4>
                <div className="flex space-x-4">
                  <a href="#" className="p-3 rounded-full hover:opacity-80 transition-opacity" style={{backgroundColor: '#3b5998', color: 'white'}}>
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 rounded-full hover:opacity-80 transition-opacity" style={{backgroundColor: '#e1306c', color: 'white'}}>
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 rounded-full hover:opacity-80 transition-opacity" style={{backgroundColor: '#1da1f2', color: 'white'}}>
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                    style={{focusRingColor: '#03A6A6'}}
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                    placeholder="+57 300 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tour de interés
                  </label>
                  <select
                    name="tourInterest"
                    value={formData.tourInterest}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors"
                  >
                    <option value="">Selecciona un tour</option>
                    <option value="cabo-vela">Cabo de la Vela Mágico</option>
                    <option value="sierra-nevada">Sierra Nevada Aventura</option>
                    <option value="punta-gallinas">Punta Gallinas Extremo</option>
                    <option value="personalizado">Tour Personalizado</option>
                    <option value="otro">Otro destino</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none"
                    placeholder="Cuéntanos sobre tu viaje ideal, fechas, número de personas, presupuesto..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-black py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                  style={{backgroundColor: '#ADD90D'}}
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar Mensaje</span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  * Campos obligatorios. Te responderemos en máximo 24 horas.
                </p>
              </form>
            </div>
          </div>

          {/* Sección de contacto rápido */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-4">¿Necesitas ayuda inmediata?</h4>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+573151234567"
                  className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold transition-opacity hover:opacity-90"
                  style={{backgroundColor: '#03A6A6', color: 'white'}}
                >
                  <Phone className="w-5 h-5" />
                  <span>Llamar Ahora</span>
                </a>
                <a 
                  href="https://wa.me/573151234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold transition-opacity hover:opacity-90"
                  style={{backgroundColor: '#25D366', color: 'white'}}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactModal;