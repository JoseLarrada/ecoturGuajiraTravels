import api from "./api";

// Obtener todos los slides
export const getAll = async () => {
  try {
    const response = await api.get('/slide');
    return response.data;
  } catch (error) {
    console.error('Error getting slides:', error);
    throw error;
  }
};

// Crear slide con imagen
export const createSlide = async (slide, image) => {
  const data = new FormData();
  data.append(
    "slide",
    new Blob([JSON.stringify(slide)], { type: "application/json" })
  );
  if (image) data.append("image", image);

  return await api.post("/slide", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Actualizar slide (PUT solo JSON)
export const updateSlide = async (id, slide, image = null) => {
  const data = new FormData();

  // Mandar el JSON como string plano
  data.append("slide", JSON.stringify(slide));

  // Imagen opcional
  if (image) {
    data.append("image", image);
  }

  return await api.put(`/slide/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Eliminar slide
export const deleteItem = async (id) => {
  return await api.delete(`/slide/${id}`);
};

