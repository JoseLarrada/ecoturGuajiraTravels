import React, { useState, useCallback, useEffect } from "react";
import { createDestination, updateDestination } from "../../../api/destinationService";
import { Upload, X, Plus, Trash2, Image as ImageIcon, Edit2, MapPin, Clock, Hash, FileText } from "lucide-react";

export default function DestinationDataForm({ initialData, onSubmit, onCancel, isModal = false }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    experiences: 0,
    bestTime: "",
    description: "",
    history: "",
    highlights: [],
    activities: [],
    gallery: []
  });
  const [mainImage, setMainImage] = useState(null);
  const [currentMainImageUrl, setCurrentMainImageUrl] = useState(null);
  const [currentMainImagePath, setCurrentMainImagePath] = useState(null); // Para enviar al backend
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [originalGalleryImages, setOriginalGalleryImages] = useState([]); // Para rastrear originales
  const [galleryDescriptions, setGalleryDescriptions] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [newHighlight, setNewHighlight] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [editingDescription, setEditingDescription] = useState(null);

  // Cargar datos iniciales cuando se pasan props
  useEffect(() => {
    console.log('DestinationDataForm recibió initialData:', initialData); // Debug
    if (initialData) {
      setForm({
        name: initialData.name || "",
        type: initialData.type || "",
        experiences: initialData.experiences || 0,
        bestTime: initialData.bestTime || "",
        description: initialData.description || "",
        history: initialData.history || "",
        highlights: Array.isArray(initialData.highlights) ? initialData.highlights : [],
        activities: Array.isArray(initialData.activities) ? initialData.activities : [],
        gallery: Array.isArray(initialData.gallery) ? initialData.gallery : []
      });

      // Manejar la imagen principal existente
      if (initialData.mainImage) {
        const fullImageUrl = initialData.mainImage.startsWith('http') 
          ? initialData.mainImage 
          : `http://localhost:8080${initialData.mainImage}`;
        setCurrentMainImageUrl(fullImageUrl);
        setCurrentMainImagePath(initialData.mainImage); // Guardamos la ruta original
        console.log('Imagen principal URL construida:', fullImageUrl); // Debug
      } else {
        setCurrentMainImageUrl(null);
        setCurrentMainImagePath(null);
      }

      // Manejar galería existente - VALIDACIONES MEJORADAS
      if (initialData.gallery && Array.isArray(initialData.gallery) && initialData.gallery.length > 0) {
        const galleryUrls = initialData.gallery.map(item => {
          // Manejar diferentes estructuras de datos
          const imageUrl = item?.image || item?.url || item;
          const caption = item?.caption || "";
          
          if (!imageUrl) {
            console.warn('Item de galería sin imagen:', item);
            return null;
          }
          
          return {
            url: imageUrl.startsWith('http') ? imageUrl : `http://localhost:8080${imageUrl}`,
            originalPath: imageUrl,
            caption: caption,
            isOriginal: true
          };
        }).filter(Boolean); // Filtrar items null

        setCurrentGalleryImages(galleryUrls);
        setOriginalGalleryImages(galleryUrls); // Guardar copia de las originales
        setGalleryDescriptions(galleryUrls.map(item => item.caption || ""));
        console.log('Galería URLs construidas:', galleryUrls); // Debug
      } else {
        setCurrentGalleryImages([]);
        setOriginalGalleryImages([]);
        setGalleryDescriptions([]);
      }
      
      // Reset de nuevas imágenes cuando se cargan datos existentes
      setMainImage(null);
      setGalleryImages([]);
    } else {
      // Reset form si no hay datos iniciales
      setForm({
        name: "",
        type: "",
        experiences: 0,
        bestTime: "",
        description: "",
        history: "",
        highlights: [],
        activities: [],
        gallery: []
      });
      setCurrentMainImageUrl(null);
      setCurrentMainImagePath(null);
      setCurrentGalleryImages([]);
      setOriginalGalleryImages([]);
      setMainImage(null);
      setGalleryImages([]);
      setGalleryDescriptions([]);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "number" ? parseInt(value) || 0 : value 
    });
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

  const handleDrop = useCallback((e, isGallery = false) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      
      if (isGallery) {
        setGalleryImages(prev => [...prev, ...files]);
        // Agregar descripciones vacías para las nuevas imágenes
        setGalleryDescriptions(prev => [
          ...prev, 
          ...files.map(() => "")
        ]);
      } else {
        setMainImage(files[0]);
      }
    }
  }, []);

  const handleMainImageChange = (e) => {
    if (e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setGalleryImages(prev => [...prev, ...newFiles]);
      // Agregar descripciones vacías para las nuevas imágenes
      setGalleryDescriptions(prev => [
        ...prev, 
        ...newFiles.map(() => "")
      ]);
    }
  };

  const removeMainImage = () => {
    setMainImage(null);
    setCurrentMainImageUrl(null);
    setCurrentMainImagePath(null);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryDescriptions(prev => prev.filter((_, i) => i !== index));
    setEditingDescription(null);
  };

  const removeCurrentGalleryImage = (index) => {
    setCurrentGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const updateGalleryDescription = (index, description) => {
    setGalleryDescriptions(prev => {
      const newDescriptions = [...prev];
      newDescriptions[index] = description;
      return newDescriptions;
    });
  };

  const updateCurrentGalleryDescription = (index, description) => {
    setCurrentGalleryImages(prev => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], caption: description };
      return newImages;
    });
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setForm(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()]
      }));
      setNewHighlight("");
    }
  };

  const removeHighlight = (index) => {
    setForm(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const addActivity = () => {
    if (newActivity.trim()) {
      setForm(prev => ({
        ...prev,
        activities: [...prev.activities, newActivity.trim()]
      }));
      setNewActivity("");
    }
  };

  const removeActivity = (index) => {
    setForm(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const clearAllImages = () => {
    setMainImage(null);
    setCurrentMainImageUrl(null);
    setCurrentMainImagePath(null);
    setGalleryImages([]);
    setCurrentGalleryImages([]);
    setGalleryDescriptions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Preparar gallery SOLO con captions para el JSON principal (destinationData)
    const keptGalleryWithCaptions = currentGalleryImages.map((img, index) => ({
      caption: img.caption || ""
    }));
    
    const newGalleryWithCaptions = galleryDescriptions.slice(currentGalleryImages.length).map((description, index) => ({
      caption: description || `Imagen ${currentGalleryImages.length + index + 1} del destino`
    }));
    
    const combinedGallery = [
      ...keptGalleryWithCaptions,
      ...newGalleryWithCaptions
    ];
    
    const finalForm = {
      ...form,
      gallery: combinedGallery // Solo captions aquí
    };

    // Preparar datos para el backend
    const keptMainImagePath = currentMainImagePath && !mainImage ? currentMainImagePath : null;
    
    // Para keptGallery: enviar objetos completos con url y caption
    const keptGalleryPaths = Array.isArray(currentGalleryImages) && currentGalleryImages.length > 0 
      ? currentGalleryImages.map(img => ({
          url: img.originalPath, // La URL original
          caption: img.caption || ""
        }))
      : [];

    // Validar que galleryImages sea un array
    const validGalleryImages = Array.isArray(galleryImages) ? galleryImages : [];

    console.log('=== DEBUG SUBMIT ===');
    console.log('Form data (destinationData):', finalForm);
    console.log('Nueva imagen principal:', mainImage?.name || 'Ninguna');
    console.log('Imagen principal conservada:', keptMainImagePath || 'Ninguna');
    console.log('Nuevas imágenes galería:', validGalleryImages.length);
    console.log('keptGalleryPaths (objetos con url y caption):', keptGalleryPaths);
    console.log('currentGalleryImages:', currentGalleryImages);
    console.log('==================');
    
    try {
      if (isModal && onSubmit) {
        // Si estamos en modo modal, usar la función onSubmit del padre
        await onSubmit(finalForm, mainImage, validGalleryImages, keptMainImagePath, keptGalleryPaths);
      } else {
        // Si estamos en modo standalone, usar el método directo
        if (initialData && initialData.id) {
          await updateDestination(
            initialData.id, 
            finalForm, 
            mainImage, 
            validGalleryImages, 
            keptMainImagePath, 
            keptGalleryPaths
          );
          alert("Destino actualizado exitosamente");
        } else {
          await createDestination(finalForm, mainImage, validGalleryImages);
          alert("Destino creado exitosamente");
        }
        
        // Reset form solo si no estamos en modal
        setForm({
          name: "",
          type: "",
          experiences: 0,
          bestTime: "",
          description: "",
          history: "",
          highlights: [],
          activities: [],
          gallery: []
        });
        setMainImage(null);
        setCurrentMainImageUrl(null);
        setCurrentMainImagePath(null);
        setGalleryImages([]);
        setCurrentGalleryImages([]);
        setOriginalGalleryImages([]);
        setGalleryDescriptions([]);
        setNewHighlight("");
        setNewActivity("");
      }
    } catch (error) {
      console.error('Error al guardar el destino:', error);
      alert('Error al guardar el destino: ' + (error.response?.data || error.message || 'Error desconocido'));
    }
  };

  const hasMainImage = mainImage || currentMainImageUrl;
  const totalGalleryImages = currentGalleryImages.length + galleryImages.length;
  const containerClass = isModal ? "max-w-full" : "max-w-4xl mx-auto p-6 bg-white";
  const showHeader = !isModal;

  return (
    <div className={containerClass}>
      {showHeader && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {initialData ? 'Editar Destino' : 'Crear Nuevo Destino'}
          </h1>
          <p className="text-gray-600">Complete la información del destino turístico</p>
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
              Imagen principal: {mainImage ? 'Nueva' : currentMainImagePath ? 'Conservada' : 'Ninguna'}
            </p>
            <p className="text-xs text-yellow-700">
              Galería original: {originalGalleryImages.length} | 
              Galería conservada: {currentGalleryImages.length} | 
              Nuevas galería: {galleryImages.length}
            </p>
            <p className="text-xs text-yellow-700">
              Conservadas: {currentGalleryImages.map(img => img.originalPath.split('/').pop()).join(', ')}
            </p>
            <p className="text-xs text-yellow-700">
              Eliminadas: {originalGalleryImages.filter(orig => 
                !currentGalleryImages.find(curr => curr.originalPath === orig.originalPath)
              ).map(img => img.originalPath.split('/').pop()).join(', ')}
            </p>
          </div>
        )}

        {/* Información Básica */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Información Básica</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Destino *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Cabo de la Vela"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Destino *
              </label>
              <input
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Desierto Costero"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4 inline mr-2" />
                Número de Experiencias
              </label>
              <input
                type="number"
                name="experiences"
                value={form.experiences}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Tiempo Recomendado
              </label>
              <input
                type="text"
                name="bestTime"
                value={form.bestTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: 2-3 días"
              />
            </div>
          </div>
        </div>

        {/* Descripciones */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Descripciones</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción General *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe el destino, sus características principales y qué lo hace especial..."
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                {form.description.length}/500 caracteres
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Historia del Lugar
              </label>
              <textarea
                name="history"
                value={form.history}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Cuenta la historia, tradiciones y significado cultural del destino..."
              />
              <p className="text-sm text-gray-500 mt-2">
                {form.history.length}/1000 caracteres
              </p>
            </div>
          </div>
        </div>

        {/* Puntos Destacados */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Puntos Destacados</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: El Faro: punto más septentrional de Suramérica continental"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
              />
              <button
                type="button"
                onClick={addHighlight}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Agregar
              </button>
            </div>
            
            {form.highlights.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Puntos destacados ({form.highlights.length}):</p>
                {form.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                    <span className="text-gray-800">{highlight}</span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actividades */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Actividades</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Kitesurfing"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActivity())}
              />
              <button
                type="button"
                onClick={addActivity}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Agregar
              </button>
            </div>
            
            {form.activities.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Actividades ({form.activities.length}):</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {form.activities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                      <span className="text-gray-800">{activity}</span>
                      <button
                        type="button"
                        onClick={() => removeActivity(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Imagen Principal */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Imagen Principal
              {hasMainImage && (
                <span className="text-base font-normal text-gray-600 ml-2">
                  ({mainImage ? 'Nueva imagen seleccionada' : 'Imagen actual del servidor'})
                </span>
              )}
            </h2>
            {hasMainImage && (
              <button
                type="button"
                onClick={removeMainImage}
                className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Eliminar imagen
              </button>
            )}
          </div>

          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, false)}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            {hasMainImage ? (
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {mainImage ? (
                    <img 
                      src={URL.createObjectURL(mainImage)} 
                      alt="Nueva imagen principal" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={currentMainImageUrl} 
                      alt="Imagen principal actual" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Error cargando imagen principal:', currentMainImageUrl);
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Error</text></svg>';
                      }}
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {mainImage ? mainImage.name : 'Imagen actual del servidor'}
                  </p>
                  {mainImage && (
                    <>
                      <p className="text-xs text-gray-500">
                        {(mainImage.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mt-1">
                        Nueva
                      </span>
                    </>
                  )}
                  {currentMainImageUrl && !mainImage && (
                    <>
                      <p className="text-xs text-gray-500">
                        URL: {currentMainImagePath?.split('/').pop()}
                      </p>
                      <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mt-1">
                        Actual
                      </span>
                    </>
                  )}
                </div>
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

        {/* Galería */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Galería de Imágenes 
              {totalGalleryImages > 0 && (
                <span className="text-base font-normal text-gray-600 ml-2">
                  ({totalGalleryImages} imagen{totalGalleryImages !== 1 ? 'es' : ''} total{totalGalleryImages !== 1 ? 'es' : ''})
                </span>
              )}
            </h2>
            {totalGalleryImages > 0 && (
              <button
                type="button"
                onClick={clearAllImages}
                className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Limpiar todo
              </button>
            )}
          </div>

          {/* Imágenes actuales de la galería */}
          {currentGalleryImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Imágenes actuales ({currentGalleryImages.length})
                <span className="text-sm font-normal text-gray-600 ml-2">
                  - Se conservarán al actualizar
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentGalleryImages.map((imageData, index) => (
                  <div key={`current-${index}`} className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="relative">
                      <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center mb-3 overflow-hidden">
                        <img 
                          src={imageData.url} 
                          alt={imageData.caption || `Imagen actual ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Error cargando imagen de galería:', imageData.url);
                            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Error</text></svg>';
                          }}
                        />
                      </div>
                      <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Actual
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCurrentGalleryImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        title="Eliminar imagen (se borrará del servidor al guardar)"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 font-medium">
                        Del servidor • {imageData.originalPath?.split('/').pop()}
                      </p>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Descripción:
                        </label>
                        <textarea
                          value={imageData.caption || ""}
                          onChange={(e) => updateCurrentGalleryDescription(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={2}
                          placeholder="Ej: El icónico Faro del Cabo"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload área para nuevas imágenes */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, true)}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
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
          {galleryImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Nuevas imágenes seleccionadas ({galleryImages.length})
                <span className="text-sm font-normal text-gray-600 ml-2">
                  - Se subirán al actualizar
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {galleryImages.map((image, index) => (
                  <div key={`new-${index}`} className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="relative">
                      <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center mb-3 overflow-hidden">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        Nueva
                      </span>
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 font-medium truncate">
                        {image.name} • {(image.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Descripción de la imagen:
                        </label>
                        {editingDescription === index ? (
                          <div className="space-y-2">
                            <textarea
                              value={galleryDescriptions[currentGalleryImages.length + index] || ""}
                              onChange={(e) => updateGalleryDescription(currentGalleryImages.length + index, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              rows={2}
                              placeholder="Ej: El icónico Faro del Cabo"
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingDescription(null)}
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                              >
                                Guardar
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  updateGalleryDescription(currentGalleryImages.length + index, "");
                                  setEditingDescription(null);
                                }}
                                className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div 
                            className="min-h-[2rem] p-2 bg-gray-50 rounded text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between group"
                            onClick={() => setEditingDescription(index)}
                          >
                            <span className="flex-1">
                              {galleryDescriptions[currentGalleryImages.length + index] || "Haz clic para agregar descripción..."}
                            </span>
                            <Edit2 size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vista Previa */}
        {(form.name || form.description || hasMainImage) && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vista Previa</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              {hasMainImage && (
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  {mainImage ? (
                    <img 
                      src={URL.createObjectURL(mainImage)} 
                      alt="Preview principal" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={currentMainImageUrl} 
                      alt="Preview principal actual" 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {mainImage ? 'Nueva imagen' : 'Imagen actual'}
                  </span>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {form.name || "Nombre del destino"}
                  </h3>
                  {form.type && (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {form.type}
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Hash size={16} className="text-gray-500" />
                    <span>{form.experiences} experiencias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    <span>{form.bestTime || "Tiempo no especificado"}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {form.description || "Descripción del destino"}
                </p>
                
                {form.history && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Historia</h4>
                    <p className="text-gray-600 text-sm">{form.history}</p>
                  </div>
                )}
                
                {form.highlights.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Puntos Destacados</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {form.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {form.activities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Actividades</h4>
                    <div className="flex flex-wrap gap-2">
                      {form.activities.map((activity, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {totalGalleryImages > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Galería</h4>
                    <div className="flex gap-2 overflow-x-auto">
                      {/* Mostrar imágenes actuales conservadas */}
                      {currentGalleryImages.slice(0, 4).map((imageData, index) => (
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
                      {galleryImages.slice(0, 4 - currentGalleryImages.length).map((image, index) => (
                        <div key={`preview-new-${index}`} className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden relative border-2 border-blue-300">
                          <img 
                            src={URL.createObjectURL(image)} 
                            alt={`Preview new ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-1 rounded-bl">N</span>
                        </div>
                      ))}
                      {totalGalleryImages > 4 && (
                        <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center">
                          <span className="text-xs text-gray-600">+{totalGalleryImages - 4}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {totalGalleryImages} imagen{totalGalleryImages !== 1 ? 'es' : ''} total
                      {currentGalleryImages.length > 0 && ` (${currentGalleryImages.length} actual${currentGalleryImages.length !== 1 ? 'es' : ''})`}
                      {galleryImages.length > 0 && ` (${galleryImages.length} nueva${galleryImages.length !== 1 ? 's' : ''})`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Botón de Envío */}
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
            disabled={!form.name || !form.type || !form.description}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialData ? 'Actualizar Destino' : 'Crear Destino'}
          </button>
        </div>
      </form>
    </div>
  );
}