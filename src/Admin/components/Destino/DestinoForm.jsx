import React, { useState, useCallback, useEffect } from "react";
import { createDestino, updateDestino } from "../../../api/destinoService";
import { 
  Upload, 
  X, 
  Plus, 
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

export default function DestinoForm({ initialData, onSubmit, onCancel, isModal = false }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    experiencias: [],
    color: "",
    icon: ""
  });
  const [imagen, setImagen] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [newExperiencia, setNewExperiencia] = useState("");

  // Cargar datos iniciales cuando se pasan props
  useEffect(() => {
    console.log('DestinoForm recibió initialData:', initialData); // Debug
    if (initialData) {
      setForm({
        nombre: initialData.nombre || "",
        descripcion: initialData.descripcion || "",
        experiencias: Array.isArray(initialData.experiencias) ? initialData.experiencias : [],
        color: initialData.color || "",
        icon: initialData.icon || ""
      });

      // Manejar la imagen existente
      if (initialData.imagen) {
        // Construir la URL completa de la imagen
        const fullImageUrl = initialData.imagen.startsWith('http') 
          ? initialData.imagen 
          : `http://localhost:8080${initialData.imagen}`;
        setCurrentImageUrl(fullImageUrl);
        console.log('Imagen URL construida:', fullImageUrl); // Debug
      } else {
        setCurrentImageUrl(null);
      }
      
      // Reset de nueva imagen cuando se cargan datos existentes
      setImagen(null);
    } else {
      // Reset form si no hay datos iniciales
      setForm({
        nombre: "",
        descripcion: "",
        experiencias: [],
        color: "",
        icon: ""
      });
      setCurrentImageUrl(null);
      setImagen(null);
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
    { name: "Esmeralda a Verde", value: "from-emerald-400 to-green-500", preview: "bg-gradient-to-r from-emerald-400 to-green-500" },
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImagen(e.dataTransfer.files[0]);
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImagen(null);
    setCurrentImageUrl(null);
  };

  const addExperiencia = () => {
    if (newExperiencia.trim()) {
      setForm(prev => ({
        ...prev,
        experiencias: [...prev.experiencias, newExperiencia.trim()]
      }));
      setNewExperiencia("");
    }
  };

  const removeExperiencia = (index) => {
    setForm(prev => ({
      ...prev,
      experiencias: prev.experiencias.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Enviando formulario:', form); // Debug
    console.log('Imagen a enviar:', imagen); // Debug

    try {
      if (isModal && onSubmit) {
        // Si estamos en modo modal, usar la función onSubmit del padre
        await onSubmit(form, imagen);
      } else {
        // Si estamos en modo standalone, usar el método directo
        if (initialData && initialData.id) {
          await updateDestino(initialData.id, form, imagen);
          alert("Destino actualizado exitosamente");
        } else {
          await createDestino(form, imagen);
          alert("Destino creado exitosamente");
        }
        
        // Reset form solo si no estamos en modal
        setForm({
          nombre: "",
          descripcion: "",
          experiencias: [],
          color: "",
          icon: ""
        });
        setImagen(null);
        setCurrentImageUrl(null);
        setNewExperiencia("");
      }
    } catch (error) {
      console.error('Error al guardar el destino:', error);
      alert('Error al guardar el destino');
    }
  };

  const getSelectedIcon = () => {
    const selected = iconOptions.find(option => option.value === form.icon);
    return selected ? selected.component : null;
  };

  // Función para renderizar la imagen
  const renderImagePreview = () => {
    if (imagen) {
      // Nueva imagen seleccionada (archivo local)
      return (
        <img 
          src={URL.createObjectURL(imagen)} 
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

  const SelectedIcon = getSelectedIcon();
  const hasImage = imagen || currentImageUrl;
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
        {/* Información Básica */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Básica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Destino *
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Camarones y Santuario Los Flamencos"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Ej: Observa flamencos en su hábitat natural"
                required
              />
            </div>
          </div>
        </div>

        {/* Experiencias */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Experiencias</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newExperiencia}
                onChange={(e) => setNewExperiencia(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Paseo Acuático"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExperiencia())}
              />
              <button
                type="button"
                onClick={addExperiencia}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Agregar
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {form.experiencias.map((experiencia, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <span className="text-gray-800">{experiencia}</span>
                  <button
                    type="button"
                    onClick={() => removeExperiencia(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
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

        {/* Imagen del Destino */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Imagen del Destino</h2>
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
                <div className="w-48 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {renderImagePreview()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {imagen ? imagen.name : 'Imagen actual del servidor'}
                  </p>
                  {imagen && (
                    <p className="text-xs text-gray-500">
                      {(imagen.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                  {currentImageUrl && !imagen && (
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
                  {imagen ? 'Eliminar nueva imagen' : 'Eliminar imagen actual'}
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

        {/* Vista Previa del Destino */}
        {(form.nombre || form.descripcion || form.icon || form.color) && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vista Previa</h2>
            <div className="bg-white rounded-lg p-6 border">
              <div className="flex items-start gap-4">
                {SelectedIcon && (
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${form.color || 'from-gray-400 to-gray-500'}`}>
                    <SelectedIcon className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {form.nombre || "Nombre del destino"}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {form.descripcion || "Descripción del destino"}
                  </p>
                  {form.experiencias.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Experiencias:</p>
                      <div className="flex flex-wrap gap-2">
                        {form.experiencias.map((exp, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Vista previa de imagen si existe */}
              {hasImage && (
                <div className="mt-4 w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                  {renderImagePreview()}
                </div>
              )}
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
            disabled={!form.nombre || !form.descripcion || !form.icon || !form.color}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialData ? 'Actualizar Destino' : 'Crear Destino'}
          </button>
        </div>
      </form>
    </div>
  );
}
