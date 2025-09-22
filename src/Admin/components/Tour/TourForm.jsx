import React, { useState, useCallback, useEffect } from "react";
import { createTour, updateTour } from "../../../api/tourService";
import { 
  Upload, 
  Trash2, 
  Star,
  Clock,
  DollarSign,
  Award,
  Palette,
  FileText
} from "lucide-react";

export default function TourForm({ initialData, onSubmit, onCancel, isModal = false }) {
  const [form, setForm] = useState({
    title: "",
    duration: "",
    price: "",
    rating: "",
    badge: "",
    badgeColor: "",
    description: ""
  });
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Cargar datos iniciales cuando se pasan props
  useEffect(() => {
    console.log('TourForm recibió initialData:', initialData); // Debug
    if (initialData) {
      setForm({
        title: initialData.title || "",
        duration: initialData.duration || "",
        price: initialData.price?.toString() || "",
        rating: initialData.rating?.toString() || "",
        badge: initialData.badge || "",
        badgeColor: initialData.badgeColor || "",
        description: initialData.description || ""
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
        title: "",
        duration: "",
        price: "",
        rating: "",
        badge: "",
        badgeColor: "",
        description: ""
      });
      setCurrentImageUrl(null);
      setImage(null);
    }
  }, [initialData]);

  // Opciones de badges predefinidos
  const badgeOptions = [
    { value: "", label: "Sin badge" },
    { value: "Más Popular", label: "Más Popular" },
    { value: "Más Vendido", label: "Más Vendido" },
    { value: "Recomendado", label: "Recomendado" },
    { value: "Próxima Salida", label: "Próxima Salida" }
  ];

  // Opciones de colores para el badge
  const badgeColorOptions = [
    { value: "", label: "Sin color", preview: "bg-gray-400" },
    { value: "bg-red-500", label: "Rojo", preview: "bg-red-500" },
    { value: "bg-blue-500", label: "Azul", preview: "bg-blue-500" },
    { value: "bg-green-500", label: "Verde", preview: "bg-green-500" },
    { value: "bg-yellow-500", label: "Amarillo", preview: "bg-yellow-500" },
    { value: "bg-purple-500", label: "Púrpura", preview: "bg-purple-500" },
    { value: "bg-pink-500", label: "Rosa", preview: "bg-pink-500" },
    { value: "bg-indigo-500", label: "Índigo", preview: "bg-indigo-500" },
    { value: "bg-orange-500", label: "Naranja", preview: "bg-orange-500" }
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === "number" ? value : value 
    }));
  };

  // Drag and drop handlers
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
    
    // Convertir price y rating a números antes de enviar
    const finalForm = {
      ...form,
      price: form.price ? parseFloat(form.price) : 0,
      rating: form.rating ? parseFloat(form.rating) : 0
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
          await updateTour(initialData.id, finalForm, image);
          alert("Tour actualizado exitosamente");
        } else {
          await createTour(finalForm, image);
          alert("Tour creado exitosamente");
        }
        
        // Reset form solo si no estamos en modal
        setForm({
          title: "",
          duration: "",
          price: "",
          rating: "",
          badge: "",
          badgeColor: "",
          description: ""
        });
        setImage(null);
        setCurrentImageUrl(null);
      }
    } catch (error) {
      console.error('Error al guardar el tour:', error);
      alert('Error al guardar el tour');
    }
  };

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    const stars = [];
    const ratingValue = parseFloat(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${
            i <= ratingValue 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  // Función para renderizar la imagen
  const renderImagePreview = () => {
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
    }
    return null;
  };

  const hasImage = image || currentImageUrl;
  const containerClass = isModal ? "max-w-full" : "max-w-4xl mx-auto p-6 bg-white";
  const showHeader = !isModal;

  return (
    <div className={containerClass}>
      {showHeader && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {initialData ? 'Editar Tour' : 'Crear Nuevo Tour'}
          </h1>
          <p className="text-gray-600">Complete la información del tour turístico</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Información Principal */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Información Principal</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Tour *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Cabo de la Vela Mágico"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Duración *
              </label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: 4 días / 3 noches"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Precio (COP) *
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="280000"
                min="0"
                step="1000"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Star className="w-4 h-4 inline mr-2" />
                Calificación
              </label>
              <input
                type="number"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="4.8"
                min="0"
                max="5"
                step="0.1"
              />
              {form.rating && (
                <div className="flex items-center gap-1 mt-2">
                  {renderStars(form.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {form.rating} de 5
                  </span>
                </div>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Ej: Explora las playas vírgenes y la cultura Wayuu en este paraíso desértico."
                required
              />
            </div>
          </div>
        </div>

        {/* Badge y Color */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Badge Promocional</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Badge
              </label>
              <select
                name="badge"
                value={form.badge}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {badgeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Palette className="w-4 h-4 inline mr-2" />
                Color del Badge
              </label>
              <div className="space-y-2">
                <select
                  name="badgeColor"
                  value={form.badgeColor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={!form.badge}
                >
                  {badgeColorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                {/* Vista previa del color */}
                {form.badgeColor && (
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded ${form.badgeColor}`}></div>
                    <span className="text-sm text-gray-600">{form.badgeColor}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Vista previa del badge */}
          {form.badge && form.badgeColor && (
            <div className="mt-4 p-4 bg-white rounded-lg border">
              <p className="text-sm text-gray-600 mb-2">Vista previa del badge:</p>
              <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${form.badgeColor}`}>
                {form.badge}
              </span>
            </div>
          )}
        </div>

        {/* Imagen del Tour */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Imagen del Tour</h2>
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
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
            
            {hasImage ? (
              <div className="space-y-4">
                <div className="w-64 h-40 mx-auto bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {renderImagePreview()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {image ? image.name : 'Imagen actual del servidor'}
                  </p>
                  {image && (
                    <p className="text-xs text-gray-500">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                  {currentImageUrl && !image && (
                    <p className="text-xs text-gray-500">
                      URL: {currentImageUrl}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Trash2 size={16} />
                  {image ? 'Eliminar nueva imagen' : 'Eliminar imagen actual'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload size={48} className="mx-auto text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Arrastra tu imagen aquí o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG, JPEG hasta 10MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vista Previa del Tour */}
        {(form.title || form.description || form.price) && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vista Previa</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border">
              {hasImage && (
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  {renderImagePreview()}
                  {form.badge && form.badgeColor && (
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium ${form.badgeColor}`}>
                      {form.badge}
                    </span>
                  )}
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {form.title || "Título del tour"}
                  </h3>
                  {form.rating && (
                    <div className="flex items-center gap-1">
                      {renderStars(form.rating)}
                      <span className="ml-1 text-sm text-gray-600">
                        {form.rating}
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">
                  {form.description || "Descripción del tour"}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{form.duration || "Duración"}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {form.price ? `$${parseInt(form.price).toLocaleString()}` : "Precio"}
                  </div>
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
            disabled={!form.title || !form.duration || !form.price || !form.description}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialData ? 'Actualizar Tour' : 'Crear Tour'}
          </button>
        </div>
      </form>
    </div>
  );
}
