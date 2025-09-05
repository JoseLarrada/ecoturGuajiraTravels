import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  User,
  Clock,
  CheckCircle,
  Compass
} from 'lucide-react';
import emailjs from "emailjs-com";
import InputField from '../components/reservas/InputField'
import ReservationSummary from '../components/reservas/ReservationSummary'
const ReservationModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Datos del tour
    tour: '',
    fechaViaje: '',
    numPersonas: '2',
    tipoHospedaje: '',
    
    // Datos personales
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    ciudad: '',
    
    // Preferencias
    necesidadesEspeciales: '',
    comentarios: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    emailjs.init("icxJEq9FuCFOBIhHL"); // Tu public key
  }, []);

  const tourOptions = [
    { value: 'Montes de Oca', label: 'Montes de Oca - 1 días ($250.000/persona)' },
    { value: 'Cabo de la Vela', label: 'Cabo de la Vela - 1 días ($280.000/persona)' },
    { value: 'Punta Gallina', label: 'Punta Gallina- 2 días ($800.000/persona)' },
    { value: 'Manaure', label: 'Manaure - 1 días ($110.000/persona)' },
    { value: 'Mayapo', label: 'Mayapo - 1 día ($150.000/persona)' },
    { value: 'Camarones', label: 'Camarones - 1 día ($200.000/persona)' },
    { value: 'Palomino', label: 'Palomino - 1 día ($250.000/persona)' },
    { value: 'Dibulla', label: 'Dibulla - 1 día ($250.000/persona)' },
    { value: 'Poportin', label: 'Poportin - 1 día ($200.000/persona)' }
  ];

  const hospedajeOptions = [
    { value: 'camping', label: 'Camping en la playa' },
    { value: 'hamaca', label: 'Hamacas tradicionales' },
    { value: 'cabana', label: 'Cabañas ecológicas' },
    { value: 'hotel', label: 'Hotel/Posada' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.tour) newErrors.tour = 'Selecciona un tour';
      if (!formData.fechaViaje) newErrors.fechaViaje = 'Selecciona la fecha de viaje';
      if (!formData.numPersonas) newErrors.numPersonas = 'Indica el número de personas';
      if (!formData.tipoHospedaje) newErrors.tipoHospedaje = 'Selecciona el tipo de hospedaje';
    }
    
    if (step === 2) {
      if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
      if (!formData.apellido) newErrors.apellido = 'El apellido es requerido';
      if (!formData.email) newErrors.email = 'El email es requerido';
      if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido';
      if (!formData.ciudad) newErrors.ciudad = 'La ciudad es requerida';
      
      // Validar formato de email
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email inválido';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    setIsSubmitting(true);

    // Simular envío del formulario
    setTimeout(() => {
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((result) => {
        console.log("Correo enviado con éxito", result.text);
        setIsSubmitting(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        console.error("Error al enviar el correo", error.text);
        alert("Ocurrió un error al enviar el correo ❌");
      });
      
    }, 2000);
  };

  /** 
   * const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página
  };
  */

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      tour: '',
      fechaViaje: '',
      numPersonas: '2',
      tipoHospedaje: '',
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      ciudad: '',
      necesidadesEspeciales: '',
      comentarios: ''
    });
    setErrors({});
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6A8C20] to-[#ADD90D] p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Reserva tu Aventura</h2>
                <p className="text-white/90">Haz de tus vacaciones un sueño</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-white' : 'text-white/50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-white text-[#6A8C20]' : 'bg-white/20'}`}>
                1
              </div>
              <span className="font-medium">Detalles del Tour</span>
            </div>
            <div className="flex-1 h-0.5 bg-white/30"></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-white' : 'text-white/50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-white text-[#6A8C20]' : 'bg-white/20'}`}>
                2
              </div>
              <span className="font-medium">Información Personal</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(70vh-200px)]">
          {isSuccess ? (
            // Success Screen
            <div className="text-center py-12">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">¡Reserva Enviada!</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Hemos recibido tu solicitud de reserva. Te contactaremos en las próximas 2 horas para confirmar los detalles y el pago.
              </p>
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-[#6A8C20] to-[#ADD90D] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {currentStep === 1 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Detalles del Tour</h3>
                    
                    <InputField
                      label="Selecciona tu tour"
                      type="select"
                      value={formData.tour}
                      onChange={(e) => handleInputChange('tour', e.target.value)}
                      placeholder="Elige tu aventura en La Guajira"
                      icon={MapPin}
                      options={tourOptions}
                      required
                      error={errors.tour}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Fecha de viaje"
                        type="date"
                        value={formData.fechaViaje}
                        onChange={(e) => handleInputChange('fechaViaje', e.target.value)}
                        icon={Calendar}
                        required
                        error={errors.fechaViaje}
                      />

                      <InputField
                        label="Número de personas"
                        type="number"
                        value={formData.numPersonas}
                        onChange={(e) => handleInputChange('numPersonas', e.target.value)}
                        placeholder="¿Cuántos viajeros?"
                        icon={Users}
                        required
                        error={errors.numPersonas}
                      />
                    </div>

                    <InputField
                      label="Tipo de hospedaje"
                      type="select"
                      value={formData.tipoHospedaje}
                      onChange={(e) => handleInputChange('tipoHospedaje', e.target.value)}
                      placeholder="¿Cómo prefieres hospedarte?"
                      icon={MapPin}
                      options={hospedajeOptions}
                      required
                      error={errors.tipoHospedaje}
                    />
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Información Personal</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        placeholder="Tu nombre"
                        icon={User}
                        required
                        error={errors.nombre}
                      />

                      <InputField
                        label="Apellido"
                        value={formData.apellido}
                        onChange={(e) => handleInputChange('apellido', e.target.value)}
                        placeholder="Tu apellido"
                        icon={User}
                        required
                        error={errors.apellido}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="tu@email.com"
                        icon={Mail}
                        required
                        error={errors.email}
                      />

                      <InputField
                        label="Teléfono"
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                        placeholder="+57 300 123 4567"
                        icon={Phone}
                        required
                        error={errors.telefono}
                      />
                    </div>

                    <InputField
                      label="Ciudad de origen"
                      value={formData.ciudad}
                      onChange={(e) => handleInputChange('ciudad', e.target.value)}
                      placeholder="¿De dónde nos visitas?"
                      icon={MapPin}
                      required
                      error={errors.ciudad}
                    />

                    <InputField
                      label="Necesidades especiales"
                      type="textarea"
                      value={formData.necesidadesEspeciales}
                      onChange={(e) => handleInputChange('necesidadesEspeciales', e.target.value)}
                      placeholder="Alergias, dietas especiales, movilidad reducida, etc."
                    />

                    <InputField
                      label="Comentarios adicionales"
                      type="textarea"
                      value={formData.comentarios}
                      onChange={(e) => handleInputChange('comentarios', e.target.value)}
                      placeholder="¿Algo más que quieras contarnos sobre tu viaje?"
                    />
                  </>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-6">
                <ReservationSummary formData={formData} />
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    ¿Qué incluye?
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Transporte en 4x4</li>
                    <li>• Guía especializado</li>
                    <li>• Todas las comidas</li>
                    <li>• Hospedaje incluido</li>
                    <li>• Seguro de viaje</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!isSuccess && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                >
                  Atrás
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 2 ? (
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#6A8C20] to-[#ADD90D] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Continuar
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#6A8C20] to-[#ADD90D] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Reserva'
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;