import api from "./api";

// Obtener todas las opciones de tour
export const getAll = async () => {
  try {
    const response = await api.get('/tour-option');
    return response.data;
  } catch (error) {
    console.error('Error getting tour options:', error);
    throw error;
  }
};

// Crear opción de tour
export const createTourOption = async (tourOption) => {
  return await api.post("/tour-option", tourOption, {
    headers: { "Content-Type": "application/json" },
  });
};

// Actualizar opción de tour
export const updateTourOption = async (tourOption) => {
  return await api.put("/tour-option", tourOption, {
    headers: { "Content-Type": "application/json" },
  });
};

// Eliminar opción de tour
export const deleteItem = async (id) => {
  return await api.delete(`/tour-option/${id}`);
};
