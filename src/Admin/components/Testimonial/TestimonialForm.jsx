import React, { useState, useCallback, useEffect } from "react";
import { createTestimonial, updateTestimonial } from "../../../api/testimonialService";
import { 
  Upload, 
  Trash2, 
  User,
  MapPin,
  Star,
  MessageSquare,
  Camera
} from "lucide-react";

export default function TestimonialForm({ initialData, onSubmit, onCancel, isModal = false }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: "",
    text: ""
  });
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Cargar datos iniciales cuando se pasan props
  useEffect(() => {
    console.log('TestimonialForm recibió initialData:', initialData); // Debug
    if (initialData) {
      setForm({
        name: initialData.name || "",
        location: initialData.location || "",
        rating: initialData.rating?.toString() || "",
        text: initialData.text || ""
      });

      // Manejar la imagen existente
      if (initialData.image) {
        // Construir la URL completa de la imagen
        const fullImageUrl = initialData.image.startsWith('http') 
          ? initialData.image 
          : `http://localhost:8080${initialData.image}`;
        setCurrentImageUrl(fullImageUrl);
        console.log('Imagen URL construida:', fullImageUrl); // Debug
      } else {
        setCurrentImageUrl(null);
      }
      
      // Reset de nueva imagen cuando se cargan datos existentes
      setImage(null);
    } else {
      // Reset form si no hay datos iniciales
      setForm({
        name: "",
        location: "",
        rating: "",
        text: ""
      });
      setCurrentImageUrl(null);
      setImage(null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === "number" ? (value ? parseInt(value) : "") : value 
    }));
  };

  // Drag and drop handlers para la foto de perfil
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setCurrentImageUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convertir rating a número antes de enviar
    const finalForm = {
      ...form,
      rating: form.rating ? parseInt(form.rating) : 0
    };

    console.log('Enviando formulario:', finalForm); // Debug
    console.log('Imagen a enviar:', image); // Debug
    
    try {
      if (isModal && onSubmit) {
        // Si estamos en modo modal, usar la función onSubmit del padre
        await onSubmit(finalForm, image);
      } else {
        // Si estamos en modo standalone, usar el método directo
        if (initialData && initialData.id) {
          await updateTestimonial(initialData.id, finalForm, image);
          alert("Testimonio actualizado exitosamente");
        } else {
          await createTestimonial(finalForm, image);
          alert("Testimonio creado exitosamente");
        }
        
        // Reset form solo si no estamos en modal
        setForm({
          name: "",
          location: "",
          rating: "",
          text: ""
        });
        setImage(null);
        setCurrentImageUrl(null);
      }
    } catch (error) {
      console.error('Error al guardar el testimonio:', error);
      alert('Error al guardar el testimonio');
    }
  };

  // Función para generar iniciales
  const getInitials = (name) => {
    if (!name) return "?";
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={`${
            i <= rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  // Función para renderizar la imagen de perfil
  const renderProfileImage = () => {
    if (image) {
      // Nueva imagen seleccionada (archivo local)
      return (
        <img 
          src={URL.createObjectURL(image)} 
          alt="Preview" 
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Error cargando imagen preview:', e);
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Error</text></svg>';
          }}
        />
      );
    } else if (currentImageUrl) {
      // Imagen existente del servidor
      return (
        <img 
          src={currentImageUrl} 
          alt="Current" 
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Error cargando imagen desde servidor:', currentImageUrl);
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Sin imagen</text></svg>';
          }}
        />
      );
    } else {
      // Avatar con iniciales por defecto
      return (
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">
            {getInitials(form.name)}
          </span>
        </div>
      );
    }
  };

  const hasImage = image || currentImageUrl;
  const containerClass = isModal ? "max-w-full" : "max-w-4xl mx-auto p-6 bg-white";
  const showHeader = !isModal;

  return (
    <div className={containerClass}>
      {showHeader && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {initialData ? 'Editar Testimonio' : 'Crear Nuevo Testimonio'}
          </h1>
          <p className="text-gray-600">Complete la información del testimonio del cliente</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información del Cliente */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Información del Cliente</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Foto de Perfil */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Foto de Perfil (Opcional)
              </label>
              
              <div className="flex flex-col items-center space-y-4">
                {/* Avatar Preview */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100 flex items-center justify-center">
                  {renderProfileImage()}
                </div>

                {/* Upload Area */}
                <div
                  className={`relative w-full border-2 border-dashed rounded-lg p-4 text-center transition-all ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <Camera size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Arrastra una foto o haz clic
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                </div>

                {hasImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Trash2 size={16} />
                    {image ? 'Eliminar nueva foto' : 'Eliminar foto actual'}
                  </button>
                )}

                {/* Información de imagen actual */}
                {currentImageUrl && !image && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Imagen actual del servidor</p>
                    <p className="text-xs text-gray-400 truncate max-w-full">
                      {currentImageUrl.split('/').pop()}
                    </p>
                  </div>
                )}

                {/* Información de nueva imagen */}
                {image && (
                  <div className="text-center">
                    <p className="text-xs text-gray-600 font-medium">Nueva imagen seleccionada</p>
                    <p className="text-xs text-gray-500">{image.name}</p>
                    <p className="text-xs text-gray-400">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Datos del Cliente */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Ej: Jose Larrada"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Ubicación *
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Ej: Valledupar, Cesar"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Star className="w-4 h-4 inline mr-2" />
                  Calificación *
                </label>
                <div className="space-y-3">
                  <select
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Seleccionar calificación</option>
                    <option value="1">1 estrella</option>
                    <option value="2">2 estrellas</option>
                    <option value="3">3 estrellas</option>
                    <option value="4">4 estrellas</option>
                    <option value="5">5 estrellas</option>
                  </select>
                  
                  {form.rating && (
                    <div className="flex items-center gap-1">
                      {renderStars(parseInt(form.rating))}
                      <span className="ml-2 text-sm text-gray-600">
                        {form.rating} de 5 estrellas
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonio */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Testimonio</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texto del Testimonio *
            </label>
            <textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Ej: Una experiencia increíble en Cabo de la Vela. Los guías son muy profesionales y conocen cada rincón de La Guajira. Definitivamente volveré con mi familia."
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              {form.text.length}/500 caracteres
            </p>
          </div>
        </div>

        {/* Vista Previa del Testimonio */}
        {(form.name || form.text || form.rating) && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vista Previa</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {renderProfileImage()}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {form.name || "Nombre del cliente"}
                    </h3>
                    {form.rating && (
                      <div className="flex items-center gap-1">
                        {renderStars(parseInt(form.rating))}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <MapPin size={14} />
                    {form.location || "Ubicación del cliente"}
                  </p>
                  
                  <p className="text-gray-700 italic">
                    "{form.text || "Texto del testimonio aparecerá aquí..."}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          {isModal && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={!form.name || !form.location || !form.rating || !form.text}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialData ? 'Actualizar Testimonio' : 'Crear Testimonio'}
          </button>
        </div>
      </form>
    </div>
  );
}
