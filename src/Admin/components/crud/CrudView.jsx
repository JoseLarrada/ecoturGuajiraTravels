import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import Modal from '../common/Modal';
import SearchBar from '../common/SearchBar';
import { Plus, RefreshCw } from 'lucide-react';

const CrudView = ({ title, service, FormComponent, columns, searchFields }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [service]);

  useEffect(() => {
    filterData();
  }, [data, searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Usar el método getAll del servicio
      const result = await service.getAll();
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    if (!searchTerm) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(item => {
      return searchFields.some(field => {
        const value = getNestedValue(item, field)?.toString().toLowerCase();
        return value?.includes(searchTerm.toLowerCase());
      });
    });
    setFilteredData(filtered);
  };

  // Función para obtener valores anidados (ej: hospedajeOptions.name)
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este elemento?')) {
      try {
        await service.deleteItem(id);
        setData(data.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error al eliminar el elemento');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleFormSubmit = async (formData, additionalData = null) => {
    try {
      let result;
      if (editingItem) {
        // Actualizar elemento existente
        result = await service.updateItem(editingItem.id, formData, additionalData);
        setData(data.map(item => 
          item.id === editingItem.id ? result : item
        ));
      } else {
        // Crear nuevo elemento
        result = await service.create(formData, additionalData);
        setData([...data, result]);
      }
      handleModalClose();
      alert(editingItem ? 'Elemento actualizado exitosamente' : 'Elemento creado exitosamente');
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error al guardar el elemento');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">Gestiona los {title.toLowerCase()}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Crear {title.slice(0, -1)}
          </button>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder={`Buscar ${title.toLowerCase()}...`}
      />

      {/* Data Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={editingItem ? `Editar ${title.slice(0, -1)}` : `Crear ${title.slice(0, -1)}`}
        size="xl"
      >
        <FormComponent
          initialData={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default CrudView;