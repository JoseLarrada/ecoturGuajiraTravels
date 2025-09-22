import React, { useState, useEffect } from 'react';

const FormWrapper = ({ FormComponent, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [additionalData, setAdditionalData] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (data, additional = null) => {
    setAdditionalData(additional);
    onSubmit(data, additional);
  };

  return (
    <div className="max-w-full">
      <FormComponent 
        initialData={initialData}
        onSubmit={handleSubmit}
        isModal={true}
      />
      
      {/* Botones del modal */}
      <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default FormWrapper;