import React, { useState, useCallback, useEffect } from "react";
import { createSlide, updateSlide } from "../../../api/slideService";
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon,
  MapPin,
  Clock,
  Users,
  DollarSign,
  FileText
} from "lucide-react";

export default function SlideForm({ initialData, onSubmit, onCancel, isModal = false }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    capacity: "",
    price: ""
  });
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Cargar datos iniciales cuando se pasan props
  useEffect(() => {
    console.log('SlideForm recibió initialData:', initialData); // Debug
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        location: initialData.location || "",
        duration: initialData.duration || "",
        capacity: initialData.capacity || "",
        price: initialData.price?.toString() || ""
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
        description: "",
        location: "",
        duration: "",
        capacity: "",
        price: ""
      });
      setCurrentImageUrl(null);
      setImage(null);
    }
  }, [initialData]);

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
    
    // Convertir price a número antes de enviar
    const finalForm = {
      ...form,
      price: form.price ? parseFloat(form.price) : 0
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
          await updateItem(initialData.id, finalForm, image);
          alert("Slide actualizado exitosamente");
        } else {
          await createSlide(finalForm, image);
          alert("Slide creado exitosamente");
        }
        
        // Reset form solo si no estamos en modal
        setForm({
          title: "",
          description: "",
          location: "",
          duration: "",
          capacity: "",
          price: ""
        });
        setImage(null);
        setCurrentImageUrl(null);
      }
    } catch (error) {
      console.error('Error al guardar el slide:', error);
      alert('Error al guardar el slide');
    }
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
            {initialData ? 'Editar Slide' : 'Crear Nuevo Slide'}
          </h1>
          <p className="text-gray-600">Complete la información del slide promocional</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información Principal */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Información Principal</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Montes de Oca"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Ej: Naturaleza y aventura en una reserva natural. Explora senderos, observa fauna y disfruta de paisajes impresionantes."
                required
              />
            </div>
          </div>
        </div>

        {/* Detalles del Tour */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Detalles del Tour</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="Ej: Montes de Oca, La Guajira"
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
                placeholder="Ej: 1 día"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Capacidad *
              </label>
              <input
                type="text"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: 12 personas"
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
                placeholder="250000"
                min="0"
                step="1000"
                required
              />
            </div>
          </div>
        </div>

        {/* Imagen del Slide */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Imagen del Slide</h2>
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

        {/* Vista Previa del Slide */}
        {(form.title || form.description || form.location) && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vista Previa</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border">
              {hasImage && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                  {renderImagePreview()}
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {form.title || "Título del slide"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {form.description || "Descripción del slide"}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span>{form.location || "Ubicación"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>{form.duration || "Duración"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} />
                    <span>{form.capacity || "Capacidad"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign size={16} />
                    <span>{form.price ? `$${parseInt(form.price).toLocaleString()}` : "Precio"}</span>
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
            disabled={!form.title || !form.description || !form.location || !form.duration || !form.capacity || !form.price}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialData ? 'Actualizar Slide' : 'Crear Slide'}
          </button>
        </div>
      </form>
    </div>
  );
}
