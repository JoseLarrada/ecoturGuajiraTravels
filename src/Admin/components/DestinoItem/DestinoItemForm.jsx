import React, { useState, useCallback, useEffect } from "react";
import { createDestinoItem, updateDestinoItem } from "../../../api/destinoItemService";
import { 
  Upload, 
  X, 
  Trash2, 
  Image as ImageIcon,
  Sun,
  Mountain,
  Waves,
  Camera,
  Heart,
  Fish,
  Leaf
} from "lucide-react";

export default function DestinoItemForm({ initialData, onSubmit, onCancel, isModal = false }) {
  const [form, setForm] = useState({
    title: "",
    phrase: "",
    color: "",
    icon: ""
  });
  const [images, setImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]); // Para rastrear las imágenes originales
  const [dragActive, setDragActive] = useState(false);

  // Cargar datos iniciales cuando se pasan props
  useEffect(() => {
    console.log('DestinoItemForm recibió initialData:', initialData); // Debug
    if (initialData) {
      setForm({
        title: initialData.title || "",
        phrase: initialData.phrase || "",
        color: initialData.color || "",
        icon: initialData.icon || ""
      });

      // Manejar las imágenes existentes
      if (initialData.images && Array.isArray(initialData.images)) {
        const fullImageUrls = initialData.images.map(imagePath => {
          const fullUrl = imagePath.startsWith('http') 
            ? imagePath 
            : `http://localhost:8080${imagePath}`;
          return {
            url: fullUrl,
            originalPath: imagePath, // Guardamos la ruta original para el backend
            isOriginal: true
          };
        });
        setCurrentImages(fullImageUrls);
        setOriginalImages(fullImageUrls); // Guardar copia de las originales
        console.log('Imágenes URL construidas:', fullImageUrls); // Debug
      } else {
        setCurrentImages([]);
        setOriginalImages([]);
      }
      
      // Reset de nuevas imágenes cuando se cargan datos existentes
      setImages([]);
    } else {
      // Reset form si no hay datos iniciales
      setForm({
        title: "",
        phrase: "",
        color: "",
        icon: ""
      });
      setCurrentImages([]);
      setOriginalImages([]);
      setImages([]);
    }
  }, [initialData]);

  // Opciones de iconos disponibles
  const iconOptions = [
    { name: "Sun", component: Sun, value: '<Sun className="w-6 h-6" />' },
    { name: "Mountain", component: Mountain, value: '<Mountain className="w-6 h-6" />' },
    { name: "Waves", component: Waves, value: '<Waves className="w-6 h-6" />' },
    { name: "Camera", component: Camera, value: '<Camera className="w-6 h-6" />' },
    { name: "Heart", component: Heart, value: '<Heart className="w-6 h-6" />' },
    { name: "Fish", component: Fish, value: '<Fish className="w-6 h-6" />' },
    { name: "Leaf", component: Leaf, value: '<Leaf className="w-6 h-6" />' }
  ];

  // Opciones de colores predefinidos
  const colorOptions = [
    { name: "Naranja a Rojo", value: "from-orange-400 to-red-500", preview: "bg-gradient-to-r from-orange-400 to-red-500" },
    { name: "Azul a Púrpura", value: "from-blue-400 to-purple-500", preview: "bg-gradient-to-r from-blue-400 to-purple-500" },
    { name: "Cian a Azul", value: "from-cyan-400 to-blue-500", preview: "bg-gradient-to-r from-cyan-400 to-blue-500" },
    { name: "Verde a Teal", value: "from-green-400 to-teal-500", preview: "bg-gradient-to-r from-green-400 to-teal-500" },
    { name: "Amarillo a Naranja", value: "from-yellow-400 to-orange-500", preview: "bg-gradient-to-r from-yellow-400 to-orange-500" },
    { name: "Rosa a Rosa", value: "from-pink-400 to-rose-500", preview: "bg-gradient-to-r from-pink-400 to-rose-500" },
    { name: "Esmeralda a Verde", value: "from-emerald-400 to-green-600", preview: "bg-gradient-to-r from-emerald-400 to-green-600" },
    { name: "Índigo a Azul", value: "from-indigo-400 to-blue-500", preview: "bg-gradient-to-r from-indigo-400 to-blue-500" },
    { name: "Lima a Verde", value: "from-lime-400 to-green-500", preview: "bg-gradient-to-r from-lime-400 to-green-500" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setImages(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleImagesChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeCurrentImage = (index) => {
    setCurrentImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllImages = () => {
    setImages([]);
    setCurrentImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Preparar datos para enviar
    const formData = { ...form };
    
    // Obtener las rutas de las imágenes actuales que se mantienen
    const keptImagePaths = currentImages.map(img => img.originalPath);
    
    console.log('=== DEBUG SUBMIT ===');
    console.log('Form data:', formData);
    console.log('Imágenes originales:', originalImages.map(img => img.originalPath));
    console.log('Imágenes actuales (conservadas):', keptImagePaths);
    console.log('Nuevas imágenes a subir:', images.map(img => img.name));
    console.log('==================');

    try {
      if (isModal && onSubmit) {
        // Si estamos en modo modal, usar la función onSubmit del padre
        await onSubmit(formData, images, keptImagePaths);
      } else {
        // Si estamos en modo standalone, usar el método directo
        if (initialData && initialData.id) {
          await updateDestinoItem(initialData.id, formData, images, keptImagePaths);
          alert("DestinoItem actualizado exitosamente");
        } else {
          await createDestinoItem(formData, images);
          alert("DestinoItem creado exitosamente");
        }
        
        // Reset form solo si no estamos en modal
        setForm({
          title: "",
          phrase: "",
          color: "",
          icon: ""
        });
        setImages([]);
        setCurrentImages([]);
        setOriginalImages([]);
      }
    } catch (error) {
      console.error('Error al guardar el destino item:', error);
      alert('Error al guardar el destino item');
    }
  };

  const getSelectedIcon = () => {
    const selected = iconOptions.find(option => option.value === form.icon);
    return selected ? selected.component : null;
  };

  const SelectedIcon = getSelectedIcon();
  const totalImages = currentImages.length + images.length;
  const hasImages = totalImages > 0;
  const containerClass = isModal ? "max-w-full" : "max-w-4xl mx-auto p-6 bg-white";
  const showHeader = !isModal;

  return (
    <div className={containerClass}>
      {showHeader && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {initialData ? 'Editar Item de Destino' : 'Crear Nuevo Item de Destino'}
          </h1>
          <p className="text-gray-600">Complete la información del item de destino</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Debug info - remover en producción */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 p-4 rounded border">
            <p className="text-sm text-yellow-800">
              <strong>Debug Info:</strong>
            </p>
            <p className="text-xs text-yellow-700">
              Imágenes originales: {originalImages.length} | 
              Imágenes conservadas: {currentImages.length} | 
              Nuevas imágenes: {images.length}
            </p>
            <p className="text-xs text-yellow-700">
              Conservadas: {currentImages.map(img => img.originalPath).join(', ')}
            </p>
            <p className="text-xs text-yellow-700">
              Eliminadas: {originalImages.filter(orig => 
                !currentImages.find(curr => curr.originalPath === orig.originalPath)
              ).map(img => img.originalPath).join(', ')}
            </p>
          </div>
        )}

        {/* Información Básica */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Básica</h2>
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
                Frase Descriptiva *
              </label>
              <textarea
                name="phrase"
                value={form.phrase}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Ej: Reserva natural, la más hermosa de Colombia"
                required
              />
            </div>
          </div>
        </div>

        {/* Icono y Color */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Apariencia</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Selector de Icono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Seleccionar Icono *
              </label>
              <div className="grid grid-cols-4 gap-3">
                {iconOptions.map((option) => {
                  const IconComponent = option.component;
                  const isSelected = form.icon === option.value;
                  return (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setForm({...form, icon: option.value})}
                      className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 text-blue-600' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent size={24} />
                      <span className="text-xs font-medium">{option.name}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Vista previa del icono seleccionado */}
              {form.icon && (
                <div className="mt-4 p-4 bg-white rounded-lg border">
                  <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                  <div className="flex items-center gap-3">
                    {SelectedIcon && <SelectedIcon className="w-6 h-6 text-gray-700" />}
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{form.icon}</code>
                  </div>
                </div>
              )}
            </div>

            {/* Selector de Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Seleccionar Color *
              </label>
              <div className="space-y-3">
                {colorOptions.map((option) => {
                  const isSelected = form.color === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setForm({...form, color: option.value})}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${option.preview}`}></div>
                      <span className="text-sm font-medium text-gray-700">{option.name}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Vista previa del color */}
              {form.color && (
                <div className="mt-4 p-4 bg-white rounded-lg border">
                  <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                  <div className={`h-12 rounded-lg bg-gradient-to-r ${form.color}`}></div>
                  <code className="text-xs text-gray-500 mt-2 block">{form.color}</code>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Imágenes */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Imágenes del Destino
              {hasImages && (
                <span className="text-base font-normal text-gray-600 ml-2">
                  ({totalImages} total{totalImages !== 1 ? 'es' : ''})
                </span>
              )}
            </h2>
            {hasImages && (
              <button
                type="button"
                onClick={clearAllImages}
                className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Eliminar todas
              </button>
            )}
          </div>

          {/* Imágenes actuales del servidor */}
          {currentImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Imágenes actuales ({currentImages.length})
                <span className="text-sm font-normal text-gray-600 ml-2">
                  - Se conservarán al actualizar
                </span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentImages.map((imageData, index) => (
                  <div key={`current-${index}`} className="relative bg-white p-3 rounded-lg border border-green-200">
                    <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center mb-2 overflow-hidden">
                      <img 
                        src={imageData.url} 
                        alt={`Current ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Error cargando imagen:', imageData.url);
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Error</text></svg>';
                        }}
                      />
                    </div>
                    <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Actual
                    </span>
                    <p className="text-xs text-gray-600 truncate">Del servidor</p>
                    <p className="text-xs text-gray-400">URL: {imageData.originalPath.split('/').pop()}</p>
                    <button
                      type="button"
                      onClick={() => removeCurrentImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      title="Eliminar imagen (se borrará del servidor al guardar)"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload de nuevas imágenes */}
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
              multiple
              onChange={handleImagesChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <Upload size={48} className="mx-auto text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Arrastra múltiples imágenes aquí o haz clic para seleccionar
                </p>
                <p className="text-sm text-gray-500">PNG, JPG, JPEG hasta 10MB cada una</p>
              </div>
            </div>
          </div>
          
          {/* Nuevas imágenes seleccionadas */}
          {images.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Nuevas imágenes seleccionadas ({images.length})
                <span className="text-sm font-normal text-gray-600 ml-2">
                  - Se subirán al actualizar
                </span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={`new-${index}`} className="relative bg-white p-3 rounded-lg border border-blue-200">
                    <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center mb-2 overflow-hidden">
                      <img 
                        src={URL.createObjectURL(image)} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-600 truncate">{image.name}</p>
                    <p className="text-xs text-gray-400">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Nueva
                    </span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vista Previa del Item */}
        {(form.title || form.phrase || form.icon || form.color) && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vista Previa</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className={`h-32 bg-gradient-to-r ${form.color || 'from-gray-400 to-gray-500'} flex items-center justify-center`}>
                {SelectedIcon && <SelectedIcon className="w-12 h-12 text-white" />}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {form.title || "Título del destino"}
                </h3>
                <p className="text-gray-600">
                  {form.phrase || "Frase descriptiva del destino"}
                </p>
                {hasImages && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">
                      {totalImages} imagen{totalImages !== 1 ? 'es' : ''} total{totalImages !== 1 ? 'es' : ''}
                      {currentImages.length > 0 && ` (${currentImages.length} actual${currentImages.length !== 1 ? 'es' : ''})`}
                      {images.length > 0 && ` (${images.length} nueva${images.length !== 1 ? 's' : ''})`}
                    </p>
                    <div className="flex gap-2 overflow-x-auto">
                      {/* Mostrar imágenes actuales */}
                      {currentImages.slice(0, 3).map((imageData, index) => (
                        <div key={`preview-current-${index}`} className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden relative border-2 border-green-300">
                          <img 
                            src={imageData.url} 
                            alt={`Preview current ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 rounded-bl">A</span>
                        </div>
                      ))}
                      {/* Mostrar nuevas imágenes */}
                      {images.slice(0, 3 - currentImages.length).map((image, index) => (
                        <div key={`preview-new-${index}`} className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden relative border-2 border-blue-300">
                          <img 
                            src={URL.createObjectURL(image)} 
                            alt={`Preview new ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-1 rounded-bl">N</span>
                        </div>
                      ))}
                      {totalImages > 3 && (
                        <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center">
                          <span className="text-xs text-gray-600">+{totalImages - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
            disabled={!form.title || !form.phrase || !form.icon || !form.color}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialData ? 'Actualizar Item de Destino' : 'Crear Item de Destino'}
          </button>
        </div>
      </form>
    </div>
  );
}