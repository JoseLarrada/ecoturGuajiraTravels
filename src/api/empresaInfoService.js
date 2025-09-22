import api from "./api";

// Obtener todas las empresas
export const getAll = async () => {
  try {
    const response = await api.get('/empresa-info');
    return response.data;
  } catch (error) {
    console.error('Error getting empresa info:', error);
    throw error;
  }
};

// Crear empresa
export const createEmpresa = async (empresa) => {
  return await api.post("/empresa-info", empresa, {
    headers: { "Content-Type": "application/json" },
  });
};

// Actualizar empresa
export const updateEmpresa = async (empresa) => {
  return await api.put("/empresa-info", empresa, {
    headers: { "Content-Type": "application/json" },
  });
};
