import api from "./api";

// Obtener todos los tours
export const getAll = async () => {
  try {
    const response = await api.get('/tour');
    return response.data;
  } catch (error) {
    console.error('Error getting tours:', error);
    throw error;
  }
};

// Crear tour con imagen
export const createTour = async (tour, image) => {
  const data = new FormData();
  data.append(
    "tour",
    new Blob([JSON.stringify(tour)], { type: "application/json" })
  );
  if (image) data.append("image", image);

  return await api.post("/tour", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Actualizar tour (PUT solo JSON)
export const updateTour = async (id, tour, image = null) => {
  const data = new FormData();
  data.append("tour", JSON.stringify(tour));
  if (image) data.append("image", image);

  return await api.put(`/tour/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Eliminar tour
export const deleteItem = async (id) => {
  return await api.delete(`/tour/${id}`);
};
