import React, { useState, useEffect } from "react";
import { createEmpresa, updateEmpresa } from "../../../api/empresaInfoService";
import { Plus, X, Building2, Phone, MapPin, FileText, Calendar } from "lucide-react";

export default function EmpresaInfoForm({ initialData, onSubmit, onCancel, isModal = false }) {
  const [form, setForm] = useState({
    razonSocial: "",
    telefono: "",
    ciudad: "",
    departamento: "",
    direccion: "",
    nit: "",
    actividad: "",
    formaJuridica: "",
    exposiciones: [],
    timeline: []
  });

  const [newExposicion, setNewExposicion] = useState("");
  const [newTimelineItem, setNewTimelineItem] = useState({
    year: "",
    title: "",
    description: ""
  });

  // Cargar datos iniciales cuando se pasan props
  useEffect(() => {
    console.log('EmpresaInfoForm recibió initialData:', initialData); // Debug
    if (initialData) {
      setForm({
        razonSocial: initialData.razonSocial || "",
        telefono: initialData.telefono || "",
        ciudad: initialData.ciudad || "",
        departamento: initialData.departamento || "",
        direccion: initialData.direccion || "",
        nit: initialData.nit || "",
        actividad: initialData.actividad || "",
        formaJuridica: initialData.formaJuridica || "",
        exposiciones: Array.isArray(initialData.exposiciones) ? initialData.exposiciones : [],
        timeline: Array.isArray(initialData.timeline) ? initialData.timeline : []
      });
    } else {
      // Reset form si no hay datos iniciales
      setForm({
        razonSocial: "",
        telefono: "",
        ciudad: "",
        departamento: "",
        direccion: "",
        nit: "",
        actividad: "",
        formaJuridica: "",
        exposiciones: [],
        timeline: []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addExposicion = () => {
    if (newExposicion.trim()) {
      setForm(prev => ({
        ...prev,
        exposiciones: [...prev.exposiciones, newExposicion.trim()]
      }));
      setNewExposicion("");
    }
  };

  const removeExposicion = (index) => {
    setForm(prev => ({
      ...prev,
      exposiciones: prev.exposiciones.filter((_, i) => i !== index)
    }));
  };

  const handleTimelineChange = (e) => {
    const { name, value } = e.target;
    setNewTimelineItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTimelineItem = () => {
    if (newTimelineItem.year && newTimelineItem.title && newTimelineItem.description) {
      setForm(prev => ({
        ...prev,
        timeline: [...prev.timeline, { ...newTimelineItem }]
      }));
      setNewTimelineItem({ year: "", title: "", description: "" });
    }
  };

  const removeTimelineItem = (index) => {
    setForm(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Enviando formulario:', form); // Debug

    try {
      if (isModal && onSubmit) {
        // Si estamos en modo modal, usar la función onSubmit del padre
        await onSubmit(form);
      } else {
        // Si estamos en modo standalone, usar el método directo
        if (initialData && initialData.id) {
          const updatedForm = { ...form, id: initialData.id };
          await updateEmpresa(updatedForm);
          alert("Información de empresa actualizada exitosamente");
        } else {
          await createEmpresa(form);
          alert("Información de empresa creada exitosamente");
        }
        
        // Reset form solo si no estamos en modal
        setForm({
          razonSocial: "",
          telefono: "",
          ciudad: "",
          departamento: "",
          direccion: "",
          nit: "",
          actividad: "",
          formaJuridica: "",
          exposiciones: [],
          timeline: []
        });
        setNewExposicion("");
        setNewTimelineItem({ year: "", title: "", description: "" });
      }
    } catch (error) {
      console.error('Error al guardar la información de empresa:', error);
      alert('Error al guardar la información de empresa');
    }
  };

  const containerClass = isModal ? "max-w-full" : "max-w-4xl mx-auto p-6 bg-white";
  const showHeader = !isModal;

  return (
    <div className={containerClass}>
      {showHeader && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {initialData ? 'Editar Información de la Empresa' : 'Información de la Empresa'}
          </h1>
          <p className="text-gray-600">Complete los datos corporativos y empresariales</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información Corporativa */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Información Corporativa</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Razón Social *
              </label>
              <input
                type="text"
                name="razonSocial"
                value={form.razonSocial}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Agencia De Viajes Ecotur Guajira Travels Sas"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NIT *
              </label>
              <input
                type="text"
                name="nit"
                value={form.nit}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: 9017316344"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forma Jurídica *
              </label>
              <select
                name="formaJuridica"
                value={form.formaJuridica}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="SOCIEDAD POR ACCIONES SIMPLIFICADA">Sociedad por Acciones Simplificada (SAS)</option>
                <option value="SOCIEDAD LIMITADA">Sociedad Limitada (Ltda.)</option>
                <option value="SOCIEDAD ANONIMA">Sociedad Anónima (S.A.)</option>
                <option value="EMPRESA UNIPERSONAL">Empresa Unipersonal</option>
                <option value="COOPERATIVA">Cooperativa</option>
                <option value="FUNDACION">Fundación</option>
                <option value="ASOCIACION">Asociación</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actividad Económica *
              </label>
              <input
                type="text"
                name="actividad"
                value={form.actividad}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: Actividades de operadores turísticos"
                required
              />
            </div>
          </div>
        </div>

        {/* Información de Contacto */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Información de Contacto</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: 3009743501"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departamento *
              </label>
              <input
                type="text"
                name="departamento"
                value={form.departamento}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: LA GUAJIRA"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad *
              </label>
              <input
                type="text"
                name="ciudad"
                value={form.ciudad}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: MAICAO"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección *
              </label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: CALLE 14 12 65 BRR CENTRO"
                required
              />
            </div>
          </div>
        </div>

        {/* Exposiciones */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Exposiciones y Eventos</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newExposicion}
                onChange={(e) => setNewExposicion(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ej: ExpoGuajira 2023"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExposicion())}
              />
              <button
                type="button"
                onClick={addExposicion}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Agregar
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {form.exposiciones.map((exposicion, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <span className="text-gray-800">{exposicion}</span>
                  <button
                    type="button"
                    onClick={() => removeExposicion(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Línea de Tiempo</h2>
          </div>
          
          <div className="space-y-6">
            {/* Formulario para agregar timeline */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Evento</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Año
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={newTimelineItem.year}
                    onChange={handleTimelineChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="2023"
                    min="1900"
                    max="2100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newTimelineItem.title}
                    onChange={handleTimelineChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Fundación"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={newTimelineItem.description}
                    onChange={handleTimelineChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Inicio de operaciones turísticas"
                  />
                </div>
              </div>
              
              <button
                type="button"
                onClick={addTimelineItem}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Agregar al Timeline
              </button>
            </div>
            
            {/* Lista de eventos del timeline */}
            {form.timeline.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">Eventos Agregados ({form.timeline.length})</h3>
                {form.timeline
                  .sort((a, b) => parseInt(a.year) - parseInt(b.year)) // Ordenar por año
                  .map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {item.year}
                          </span>
                          <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTimelineItem(index)}
                        className="text-red-500 hover:text-red-700 transition-colors ml-4"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Vista Previa */}
        {(form.razonSocial || form.telefono || form.ciudad) && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">Vista Previa</h2>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {form.razonSocial || "Razón Social de la Empresa"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>NIT:</strong> {form.nit || "No especificado"}</div>
                <div><strong>Teléfono:</strong> {form.telefono || "No especificado"}</div>
                <div><strong>Ciudad:</strong> {form.ciudad || "No especificado"}</div>
                <div><strong>Departamento:</strong> {form.departamento || "No especificado"}</div>
                <div className="md:col-span-2"><strong>Dirección:</strong> {form.direccion || "No especificada"}</div>
                <div className="md:col-span-2"><strong>Actividad:</strong> {form.actividad || "No especificada"}</div>
                <div className="md:col-span-2"><strong>Forma Jurídica:</strong> {form.formaJuridica || "No especificada"}</div>
              </div>
              
              {form.exposiciones.length > 0 && (
                <div className="mt-4">
                  <strong className="block mb-2">Exposiciones ({form.exposiciones.length}):</strong>
                  <div className="flex flex-wrap gap-2">
                    {form.exposiciones.map((exp, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {form.timeline.length > 0 && (
                <div className="mt-4">
                  <strong className="block mb-2">Timeline ({form.timeline.length} eventos):</strong>
                  <div className="space-y-2">
                    {form.timeline
                      .sort((a, b) => parseInt(a.year) - parseInt(b.year))
                      .map((item, index) => (
                      <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                        <span className="font-medium text-blue-600">{item.year}</span> - 
                        <span className="font-medium"> {item.title}</span>: {item.description}
                      </div>
                    ))}
                  </div>
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
            disabled={!form.razonSocial || !form.telefono || !form.ciudad || !form.nit}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initialData ? 'Actualizar Información de Empresa' : 'Guardar Información de Empresa'}
          </button>
        </div>
      </form>
    </div>
  );
}
