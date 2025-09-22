import api from "./api";

// Obtener todos los precios de tours
export const getTourPrices = async () => {
  return await api.get("/tour-price");
};

// Crear un precio de tour
export const createTourPrice = async (tourPrice) => {
  return await api.post("/tour-price", tourPrice, {
    headers: { "Content-Type": "application/json" },
  });
};

// Actualizar un precio de tour
export const updateTourPrice = async (tourPrice) => {
  return await api.put("/tour-price", tourPrice, {
    headers: { "Content-Type": "application/json" },
  });
};

// Eliminar un precio de tour
export const deleteItem = async (id) => {
  return await api.delete(`/tour-price/${id}`);
};
