import React, { useState, useEffect } from "react";
import { createTourOption, updateTourOption } from "../../../api/tourOptionService";
import { 
  DollarSign,
  Calendar,
  MapPin,
  Home,
  FileText,
  Tag
} from "lucide-react";

export default function TourOptionForm({ initialData, onSubmit, onCancel, isModal = false }) {
  const [form, setForm] = useState({
    tourName: "",
    basePrice: "",
    days: "",
    hospedajeOption: { name: "", description: "" }
  });

  // Cargar datos iniciales cuando se pasan props
  useEffect(() => {
    console.log('TourOptionForm recibió initialData:', initialData); // Debug
    if (initialData) {
      setForm({
        tourName: initialData.tourName || "",
        basePrice: initialData.basePrice?.toString() || "",
        days: initialData.days || "",
        hospedajeOption: {
          name: initialData.hospedajeOption?.name || "",
          description: initialData.hospedajeOption?.description || ""
        }
      });
    } else {
      // Reset form si no hay datos iniciales
      setForm({
        tourName: "",
        basePrice: "",
        days: "",
        hospedajeOption: { name: "", description: "" }
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "number" ? value : value 
    });
  };

  const handleHospedajeChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      hospedajeOption: { ...form.hospedajeOption, [name]: value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convertir basePrice a número antes de enviar
    const finalForm = {
      ...form,
      basePrice: form.basePrice ? parseFloat(form.basePrice) : 0
    };

    console.log('Enviando formulario:', finalForm); // Debug
    
    try {
      if (isModal && onSubmit) {
        // Si estamos en modo modal, usar la función onSubmit del padre
        await onSubmit(finalForm);
      } else {
        // Si estamos en modo standalone, usar el método directo
        if (initialData && initialData.id) {
          await updateItem(initialData.id, finalForm);
          alert("Opción de tour actualizada exitosamente");
        } else {
          await createTourOption(finalForm);
          alert("Opción de tour creada exitosamente");
        }
        
        // Reset form solo si no estamos en modal
        setForm({
          tourName: "",
          basePrice: "",
          days: "",
          hospedajeOption: { name: "", description: "" }
        });
      }
    } catch (error) {
      console.error('Error al guardar la opción de tour:', error);
      alert('Error al guardar la opción de tour');
    }
  };

  const containerClass = isModal ? "max-w-full" : "max-w-4xl mx-auto p-6 bg-white";
  const showHeader = !isModal;

  return (
    <div className={containerClass}>
      {showHeader && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {initialData ? 'Editar Opción de Tour' : 'Crear Opción de Tour'}
          </h1>
          <p className="text-gray-600">Configure las opciones de precio y hospedaje para el tour</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información del Tour */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <Tag className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Información del Tour</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Nombre del Tour *
              </label>
              <input
                type="text"
                name="tourName"
                value={form.tourName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Cabo de la Vela"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Duración *
              </label>
              <input
                type="text"
                name="days"
                value={form.days}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: 1 día"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Precio Base (COP) *
              </label>
              <input
                type="number"
                name="basePrice"
                value={form.basePrice}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="280000"
                min="0"
                step="1000"
                required
              />
              {form.basePrice && (
                <p className="text-sm text-gray-600 mt-2">
                  Precio formateado: ${parseInt(form.basePrice).toLocaleString()} COP
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Opciones de Hospedaje */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Opciones de Hospedaje</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Hospedaje *
              </label>
              <select
                name="name"
                value={form.hospedajeOption.name}
                onChange={handleHospedajeChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Seleccione el tipo de hospedaje</option>
                <option value="camping">Camping</option>
                <option value="hotel">Hotel</option>
                <option value="hostal">Hostal</option>
                <option value="cabaña">Cabaña</option>
                <option value="posada">Posada</option>
                <option value="resort">Resort</option>
                <option value="apartamento">Apartamento</option>
                <option value="casa rural">Casa Rural</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Descripción del Hospedaje *
              </label>
              <textarea
                name="description"
                value={form.hospedajeOption.description}
                onChange={handleHospedajeChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Ej: Camping en la playa con vista al mar, incluye tienda de campaña y servicios básicos"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                {form.hospedajeOption.description.length}/200 caracteres
              </p>
            </div>
          </div>
        </div>

        {/* Vista Previa */}
        {(form.tourName || form.basePrice || form.hospedajeOption.name) && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vista Previa</h2>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información del Tour */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-gray-600" />
                    {form.tourName || "Nombre del Tour"}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-gray-700">{form.days || "Duración"}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <DollarSign size={16} className="text-gray-500" />
                      <span className="text-xl font-bold text-green-600">
                        {form.basePrice ? `$${parseInt(form.basePrice).toLocaleString()}` : "Precio"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Información del Hospedaje */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Home size={20} className="text-gray-600" />
                    Hospedaje
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full capitalize">
                        {form.hospedajeOption.name || "Tipo de hospedaje"}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm">
                      {form.hospedajeOption.description || "Descripción del hospedaje"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resumen JSON */}
        {form.tourName && form.basePrice && form.hospedajeOption.name && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Estructura JSON</h2>
            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`{
  "tourName": "${form.tourName}",
  "basePrice": ${form.basePrice || 0},
  "days": "${form.days}",
  "hospedajeOptions": {
    "name": "${form.hospedajeOption.name}",
    "description": "${form.hospedajeOption.description}"
  }
}`}
              </pre>
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
            disabled={!form.tourName || !form.basePrice || !form.days || !form.hospedajeOption.name || !form.hospedajeOption.description}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialData ? 'Actualizar Opción de Tour' : 'Crear Opción de Tour'}
          </button>
        </div>
      </form>
    </div>
  );
}
